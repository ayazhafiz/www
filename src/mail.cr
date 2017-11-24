require "db"
require "pg"
require "kemal"
require "is_mobile"
require "json"
require "./mail/*"
require "./util/http"

include Util::HTTP

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

  render {{ PAGE[:mail] }}, {{LAYOUT[:standard]}}
end

# Open Database and REST APIs
DB.open ENV["HAFIZMAIL_DB"] do |db|
  # Redirect to home if on mobile
  ["/mail", "/mail/:username"].each do |path|
    before_all path do |env|
      mobile = is_mobile? env.request.headers["user-agent"]?
      env.redirect "/" if mobile
    end
  end

  # Renders mail login page
  get "/mail" do |env|
    render_login env
  end

  # Renders mail viewing page
  get "/mail/:username" do |env|
    username = env.params.url["username"].as String
    key = env.params.query["key"]?

    if res = HTTP::Mail::User.valid?(
         username: username,
         password: key,
         database: db)
      render_mail env, username: username, database: db
    else
      render_login env, username: username
    end
  end

  # Verifies user during login
  post "/mail/verify" do |env|
    username = env.params.json["username"].as String
    password = env.params.json["password"].as String

    {
      valid: HTTP::Mail::User.valid? username, password, db,
    }.to_json
  end

  # Attempts file upload
  post "/mail/send" do |env|
    file = env.params.files["file"]
    recipient = env.params.body["recipient"]
    user = env.params.body["user"]
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
