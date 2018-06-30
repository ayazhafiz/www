require "db"
require "pg"
require "kemal"
require "kemal-session"
require "is_mobile"
require "json"
require "uri"
require "uuid"
require "./mail/*"
require "./util/http"

include Util::HTTP

Kemal::Session.config do |config|
  config.secret = ENV["CRYSTALAH_SESSION_SECRET"]
  config.secure = Kemal.config.env === "production"
  config.timeout = Time::Span.new 1, 0, 0
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
    render_login env, env.params.url["username"]
  end

  get "/mail/unwrap" do |env|
    env.session.destroy if env.session.string?("user")
    render_login env
  end

  # Verifies user during login
  post "/mail/verify" do |env|
    username = env.params.body["username"]?
    password = env.params.body["password"]?

    if username && password
      username, password = URI.unescape(username), URI.unescape(password)
      valid_user? = HTTP::Mail::User.valid?(
        username,
        password,
        database: db)
      env.session.string("user", username) if valid_user?
      env.session.string("uuid", UUID.random.to_s)
      env.session.int("rand_num", rand(10000))

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

  # Attempts file upload
  post "/mail/send" do |env|
    file = env.params.files["file"]
    recipient = env.params.body["recipient"]
    user = env.session.string?("user")
    escaped_key = env.params.body["escaped-key"]

    HTTP::Mail.send(
      file: file,
      filename: file.filename,
      from: user,
      to: recipient,
      key: escaped_key,
      database: db
    ).to_json
  end
end
