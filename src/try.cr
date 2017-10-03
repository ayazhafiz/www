require "kemal"
require "json"
require "./try/*"

get "/try/rod" do |env|
  page = "try.rod"
  title = "Try rod"

  render {{ PAGE[:try_rod] }}, {{ LAYOUT[:standard] }}
end

# Processes and returns a string through `rod`
post "/try/rod" do |env|
  rod = if env.params.json["arg"]?
          try_rod env.params.json["arg"].as String
        else
          {
            error: "Must supply argument.",
          }
        end

  rod.to_json
end
