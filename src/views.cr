require "kemal"
require "is_mobile"
require "./util/http"
require "./emoji/http_emoji"

include Util::HTTP

# Renders landing page.
get "/" do |env|
  ui? = env.request.query === "ui"
  page = ui? ? "index_ui" : "index"

  title = "Ayaz Hafiz"
  mobile = is_mobile? env.request.headers["user-agent"]?

  if ui?
    render {{ PAGE[:index_ui] }}, {{ LAYOUT[:standard] }}
  else
    render {{ PAGE[:index] }}, {{ LAYOUT[:standard] }}
  end
end
