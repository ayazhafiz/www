require "kemal"
require "is_mobile"
require "./util/http"

include Util::HTTP

# Renders index page
get "/" do |env|
  page = "index"
  title = "Ayaz Hafiz"
  mobile = is_mobile? env.request.headers["user-agent"]?

  render {{ PAGE[:index] }}, {{ LAYOUT[:standard] }}
end