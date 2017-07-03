require "kemal"
require "json"
require "uri"
require "is_mobile"
require "./vector"
require "./emoji"
require "./util/kemal_util"

include KemalUtil

# Renders index page
get "/" do |env|
  title = "Ayaz Hafiz"
  mobile = is_mobile? env.request.headers["user-agent"]

  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

# Returns information about two random vectors. Specified vectors are better
# manipulated with `POST`.
#
# Vector dimension specified by an optional `dim` query, the inference of which
# is handled by `get_vector_rels`. Logs an error if vectors are not of identical
# value.
get "/vector" do |env|
  env.response.content_type = "application/json"
  dim = env.params.query["dim"]? || "2D"

  get_vector_rels(
    vect_1: (get_vector dim: dim),
    vect_2: (get_vector dim: dim)
  )
end

# Returns information about two specified vectors (2D or 3D) via POST. Request
# content type must be application/json.
post "/vector" do |env|
  env.response.content_type = "application/json"
  vect_1 = env.params.json["vect_1"].as(Hash) if env.params.json["vect_1"]?
  vect_2 = env.params.json["vect_2"].as(Hash) if env.params.json["vect_2"]?

  process_vector_request(
    vect_1: vect_1,
    vect_2: vect_2,
    path: env.request.path
  )
end

# Returns a list of emoji related to a specified query. Multiple queries are
# better manipulated with `POST`.
#
# Query can be specified in either a `like` or `q` parameter. Gives a random
# emoji from base list if nothing is specified.
get "/emoji" do |env|
  env.response.content_type = "application/json"
  query = env.params.query["like"]? || env.params.query["q"]?

  query ? get_emoji(
    query: query,
    type: "json",
    path: env.request.path
  ) : get_random_emoji(type: "json")
end
