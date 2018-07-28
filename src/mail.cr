require "db"
require "pg"
require "kemal"
require "kemal-session"
require "is_mobile"
require "json"
require "uri"
require "./mail/http"
require "./util/http"

include Util::HTTP

Kemal::Session.config do |config|
  config.secret = ENV["CRYSTALAH_SESSION_SECRET"]
  config.cookie_name = "sessid"
  config.secure = Kemal.config.env === "production"
  config.timeout = Time::Span.new 3, 0, 0 # 3 hours
end

# Render login page
private def render_login(env, username : String = "")
  page = "mail_login"
  title = "Mail"

  render {{ PAGE[:mail_login] }}, {{ LAYOUT[:standard] }}
end

# Render user's email
private def render_mail(env, username : String, database db)
  page = "mail"
  title = "#{username}'s Mail"
  files, links, senders, dates = HTTP::Mail.load for: username, database: db

  render {{ PAGE[:mail] }}, {{ LAYOUT[:standard] }}
end

# Open Database and REST APIs
DB.open ENV["HAFIZMAIL_DB"] do |db|
  # Redirect to home if on mobile
  ["/mail"].each do |path|
    before_all path do |env|
      mobile = is_mobile? env.request.headers["user-agent"]?
      env.redirect "/" if mobile
    end
  end

  # Renders mail login page
  get "/mail" do |env|
    if user = env.session.string?("user")
      render_mail env, username: user, database: db
    else
      render_login env
    end
  end

  get "/mail/:username" do |env|
    if user = env.session.string?("user")
      env.redirect "/mail"
    else
      render_login env, env.params.url["username"]
    end
  end

  get "/mail/logout" do |env|
    env.session.destroy if env.session.string?("user")
    env.redirect "/mail"
  end

  get "/mail/signup" do |env|
    if user = env.session.string?("user")
      env.redirect "/mail"
    else
      page = "mail_signup"
      title = "Signup"
      username = ""

      render {{ PAGE[:mail_login] }}, {{ LAYOUT[:standard] }}
    end
  end

  post "/mail/signup" do |env|
    env.response.content_type = "application/json"

    username = env.params.body["username"]?
    password = env.params.body["password"]?

    if username && password
      username, password = URI.unescape(username), URI.unescape(password)

      res = HTTP::Mail.signup(username, password, database: db)
      env.session.string("user", username) if res[:successful]
      res.to_json
    else
      {
        successful: false,
        error:      "Either username or password not specified.",
      }.to_json
    end
  end

  # Verifies user during login
  post "/mail/verify" do |env|
    env.response.content_type = "application/json"

    username = env.params.body["username"]?
    password = env.params.body["password"]?

    if username && password
      username, password = URI.unescape(username), URI.unescape(password)
      valid_user? = HTTP::Mail::Server::User.valid?(
        username,
        password,
        database: db)
      env.session.string("user", username) if valid_user?

      {
        valid: valid_user?,
      }.to_json
    else
      {
        valid: false,
        error: "Either username or password not specified.",
      }.to_json
    end
  end

  # Retrieves presigned upload URL
  post "/mail/auth-upload" do |env|
    env.response.content_type = "application/json"

    user = env.session.string?("user")
    recipient = env.params.body["recipient"]?
    file_name = env.params.body["file-name"]?
    file_type = env.params.body["file-type"]?

    HTTP::Mail.auth_upload(
      from: user,
      to: recipient,
      file_name: file_name,
      file_type: file_type,
      database: db
    ).to_json
  end

  # Saves upload to DB
  post "/mail/save-upload" do |env|
    env.response.content_type = "application/json"

    user = env.session.string("user")
    recipient = env.params.body["recipient"]
    file_name = env.params.body["file-name"]
    file_type = env.params.body["file-type"]

    HTTP::Mail.save_upload(
      from: user,
      to: recipient,
      file_name: file_name,
      file_type: file_type,
      database: db
    ).to_json
  end

  # Get file from DB
  post "/mail/get-file" do |env|
    env.response.content_type = "application/json"

    sender = env.params.body["sender"]
    recipient = env.session.string("user")
    file_name = env.params.body["file-name"]
    date_created = env.params.body["date-created"]

    HTTP::Mail.get_file(
      from: sender,
      to: recipient,
      file_name: file_name,
      date_created: date_created,
      database: db
    ).to_json
  end
end
