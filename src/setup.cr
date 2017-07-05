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

  HTTP::Vect.get_vector_rels(
    vect_1: (HTTP::Vect.get_vector dim: dim),
    vect_2: (HTTP::Vect.get_vector dim: dim)
  ).to_json
end

# Returns information about two specified vectors (2D or 3D) via POST. Request
# content type must be application/json.
post "/vector" do |env|
  env.response.content_type = "application/json"
  vect_1 = env.params.json["vect_1"].as(Hash) if env.params.json["vect_1"]?
  vect_2 = env.params.json["vect_2"].as(Hash) if env.params.json["vect_2"]?

  HTTP::Vect.process_vector_request(
    vect_1: vect_1,
    vect_2: vect_2,
    path: env.request.path
  ).to_json
end

# Returns a list of emoji related to a specified query. Multiple queries are
# better manipulated with `POST`.
#
# Query can be specified in either a `like` or `q` parameter. Gives a random
# emoji from base list if nothing is specified.
get "/emoji" do |env|
  env.response.content_type = "application/json"
  query = HTTP::Request::Emoji.get_q body: env.params.query

  HTTP::Emoji.emoji_like(
    query: query,
    path: env.request.path
  ).to_json
end

# Returns a list of emoji related to one or more specified queries via POST.
# Request content type must be application/json
post "/emoji" do |env|
  env.response.content_type = "application/json"
  req = env.params.json["_json"]? ||
        HTTP::Request::Emoji.get_q body: env.params.json

  HTTP::Emoji.emoji_like(
    query: req,
    path: env.request.path
  ).to_json
end
