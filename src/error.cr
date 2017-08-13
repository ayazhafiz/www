require "kemal"
require "uri"
require "is_mobile"
require "./util/kemal_util"

include KemalUtil

# Handles 404 error
error 404 do |env|
  page = "error"
  env.response.status_code = title = 404
  mobile = is_mobile? env.request.headers["user-agent"]?

  render {{ PAGE[:error] }}, {{ LAYOUT[:standard] }}
end

# Handles 500 error
error 500 do |env|
  page = "error"
  env.response.status_code = title = 500
  mobile = is_mobile? env.request.headers["user-agent"]?

  render {{ PAGE[:error] }}, {{ LAYOUT[:standard] }}
end

# Error rendering for tests and development
unless ENV["KEMAL_ENV"] === "production"
  get "/error/:code" do |env|
    env.response.status_code = env.params.url["code"].to_i
  end

  post "/error/:code" do |env|
    env.response.status_code = env.params.url["code"].to_i
  end
end
