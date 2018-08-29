require "kemal"
require "./notes/*"

# Renders notes page
get "/notes" do |env|
  page = "notes"
  title = "Notes"
  classes = HTTP::Notes::CLASSES

  render {{ PAGE[:notes] }}, {{ LAYOUT[:standard] }}
end
