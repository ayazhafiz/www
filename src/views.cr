require "kemal"
require "is_mobile"
require "./util/http_util"

include HTTP::Util

# Renders index page
get "/" do |env|
  page = "index"
  title = "Ayaz Hafiz"
  mobile = is_mobile? env.request.headers["user-agent"]?

  render {{ PAGE[:index] }}, {{ LAYOUT[:standard] }}
end
