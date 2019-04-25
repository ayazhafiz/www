require "kemal"
require "json"
require "./vector/*"

# Sets all responses to be of JSON type
# Stores the REST method used in the request
before_all "/vector" do |env|
  env.response.content_type = "application/json"
  env.set "path", "#{env.request.method} #{env.request.path}"
end

# Returns information about two random vectors. Specified vectors are better
# manipulated with `POST`.
#
# Vector dimension specified by an optional `dim` query, the inference of which
# is handled by `get_vector_rels`. Logs an error if vectors are not of identical
# value.
get "/vector" do |env|
  dim = env.params.query["dim"]? || "2D"

  HTTP::Vect.rels(
    dim: dim,
    path: env.get "path"
  ).to_json
end

# Returns information about two specified vectors (2D or 3D) via POST. Request
# content type must be application/json.
post "/vector" do |env|
  vect_1 = env.params.json["vect_1"].as(Hash) if env.params.json["vect_1"]?
  vect_2 = env.params.json["vect_2"].as(Hash) if env.params.json["vect_2"]?

  HTTP::Vect.rels(
    vect_1: vect_1,
    vect_2: vect_2,
    path: env.get "path"
  ).to_json
end
