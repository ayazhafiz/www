require "json"
require "kemal"
require "./util/http"

include Util::HTTP

get "/bios" do |env|
  page = "bios"
  title = "GoodBios"

  data_file = "./src/bios/data.txt"

  render {{ PAGE[:bios] }}, {{ LAYOUT[:standard] }}
end
