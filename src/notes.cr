require "kemal"

# Renders notes page
get "/notes" do |env|
  page = "notes"
  title = "Notes"
  classes = [
    {
      code: "EECE 2116",
      name: "Digital Logic",
    },
    {
      code: "CS 2201",
      name: "Data Structures",
    },
  ]

  render {{ PAGE[:notes] }}, {{ LAYOUT[:standard] }}
end
