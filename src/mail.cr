require "db"
require "pg"
require "kemal"
require "is_mobile"
require "json"
require "./mail/*"
require "./util/kemal_util"

include KemalUtil

# Render login page
private def render_login(env, username : String = "")
  page = "mail_login"
  title = "Mail"

  render {{ PAGE[:mail] }}, {{ LAYOUT[:standard] }}
end

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

DB.open ENV["HAFIZMAIL_DB"] do |db|
  # Renders mail viewing page
  get "/mail/:username" do |env|
    username = env.params.url["username"].as String
    key = env.params.query["key"]?

    if res = HTTP::Mail.valid_user? username, key, db
      {
        user:  username,
        key:   key,
        valid: res,
      }.to_json
    else
      render_login env, username: username
    end
  end

  # Verifies user during login
  post "/mail/verify" do |env|
    username = env.params.json["username"].as String
    password = env.params.json["password"].as String

    {
      valid: HTTP::Mail.valid_user? username, password, db,
    }.to_json
  end
end
