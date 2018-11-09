require "json"
require "kemal"
require "./util/http"

include Util::HTTP

get "/bios" do |env|
  page = "bios"
  title = "GoodBios"

  bios_data = Array(String).from_json(File.read("./src/bios/data.json"))

  render {{ PAGE[:bios] }}, {{ LAYOUT[:standard] }}
end
