require "kemal"
require "json"
require "./try/*"

NO_ARG = {
  error: "Must supply argument.",
}

read_arg = ->(env : HTTP::Server::Context) {
  env.params.json["arg"].as String
}

get "/try/anoop" do |env|
  page = "try.anoop"
  title = "Try Anoop"

  render {{ PAGE[:try] }}, {{ LAYOUT[:standard] }}
end

# Processes and returns a string through `Anoop`
post "/try/anoop" do |env|
  rod = if env.params.json["arg"]?
          try_anoop read_arg.call(env)
        else
          NO_ARG
        end

  rod.to_json
end

get "/try/rod" do |env|
  page = "try.rod"
  title = "Try rod"

  render {{ PAGE[:try] }}, {{ LAYOUT[:standard] }}
end

# Processes and returns a string through `rod`
post "/try/rod" do |env|
  rod = if env.params.json["arg"]?
          try_rod read_arg.call(env)
        else
          NO_ARG
        end

  rod.to_json
end
