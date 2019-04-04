require "kemal"
require "json"
require "./try/*"
require "./util/try"

READ_ARG = ->(env : HTTP::Server::Context) {
  env.params.json["arg"].as String
}

# Renders a playground for the `Anoop` programming language
get "/try/anoop" do |env|
  page = "try.anoop"
  title = "Try Anoop"

  render {{ PAGE[:try] }}, {{ LAYOUT[:standard] }}
end

# Processes a string through the `Anoop` programming language
post "/try/anoop" do |env|
  env.response.content_type = "application/json"
  rod = if env.params.json["arg"]?
          try_anoop READ_ARG.call(env)
        else
          Util::Try::Error::NO_ARG
        end

  rod.to_json
end

# Renders a playground for the `rod` programming language
get "/try/rod" do |env|
  page = "try.rod"
  title = "Try rod"

  render {{ PAGE[:try] }}, {{ LAYOUT[:standard] }}
end

# Processes a string through the `rod` programming language
post "/try/rod" do |env|
  env.response.content_type = "application/json"
  rod = if env.params.json["arg"]?
          try_rod READ_ARG.call(env)
        else
          Util::Try::Error::NO_ARG
        end

  rod.to_json
end
