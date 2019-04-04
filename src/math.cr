require "kemal"
require "json"
require "./rmath/*"

# Sets all responses to be of JSON type
# Stores the REST method used in the request
before_all "/math" do |env|
  env.response.content_type = "application/json"
  env.set "path", "#{env.request.method} #{env.request.path}"
end

# Evaluates a mathematical expression via POST.
# Request content type must be application/json
post "/math" do |env|
  program = env.params.json["program"].as(String) if env.params.json["program"]?

  HTTP::RMath.evaluate(
    program: program,
    path: env.get "path"
  ).to_json
end
