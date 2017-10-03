require "kemal"
require "uri"
require "is_mobile"
require "./util/kemal_util"

include KemalUtil

# Handles 404 error
[404, 500].each do |code|
  error(code) do |env|
    page = "error"
    env.response.status_code = title = code
    mobile = is_mobile? env.request.headers["user-agent"]?

    render {{ PAGE[:error] }}, {{ LAYOUT[:standard] }}
  end
end

# Error rendering for tests and development
unless ENV["KEMAL_ENV"] === "production"
  status = ->(env : HTTP::Server::Context) {
    env.response.status_code = env.params.url["code"].to_i
  }

  ["/error/:code"].each do |path|
    get(path, &status)
    post(path, &status)
  end
end
