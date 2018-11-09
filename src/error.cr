require "kemal"
require "uri"
require "is_mobile"

# Renders error 404, 500 pages
[404, 500].each do |code|
  error(code) do |env|
    page = "error"
    env.response.status_code = title = code
    mobile = is_mobile? env.request.headers["user-agent"]?

    render {{ PAGE[:error] }}, {{ LAYOUT[:standard] }}
  end
end

# Renders accessible error 404, 500 pages for tests and development
unless ENV["KEMAL_ENV"] === "production"
  set_error = ->(env : HTTP::Server::Context) {
    env.response.status_code = env.params.url["code"].to_i
  }

  ["/error/:code"].each do |path|
    get path, &set_error
    post path, &set_error
  end
end
