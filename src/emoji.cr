require "kemal"
require "json"
require "./emoji/*"

# Sets all responses to be of JSON type
# Stores the REST method used in the request
before_all "/emoji" do |env|
  env.response.content_type = "application/json"
  env.set "path", "#{env.request.method} #{env.request.path}"
end

# Returns JSON object of an emoji query
private def get_emoji(env : HTTP::Server::Context, query : Util::Emoji::Alias::Query)
  HTTP::Emoji.like(
    query: query,
    path: env.get "path"
  ).to_json
end

# Returns a list of emoji related to a specified query. Multiple queries are
# better manipulated with `POST`.
#
# Query can be specified with either a `like` or `q` parameter. Returns a random
# emoji if neither parameter is specified.
get "/emoji" do |env|
  query = HTTP::Request::Emoji.query(
    body: env.params.query,
    path: env.get "path"
  )

  get_emoji env, query
end

# Returns a list of emoji related to one or more specified queries via POST.
# Request content type must be application/json
post "/emoji" do |env|
  req = HTTP::Request::Emoji.query(
    body: env.params.json,
    path: env.get "path"
  )

  get_emoji env, req
end
