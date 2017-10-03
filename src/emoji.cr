require "kemal"
require "json"
require "./emoji/*"
require "./util/emoji_util"

before_all "/emoji" do |env|
  env.response.content_type = "application/json"
  env.set "path", "#{env.request.method} #{env.request.path}"
end

EMOJI = ->(env : EmojiUtil::Alias::Env, query : EmojiUtil::Alias::Query) {
  HTTP::Emoji.like(
    query: query,
    path: env.get "path"
  ).to_json
}

# Returns a list of emoji related to a specified query. Multiple queries are
# better manipulated with `POST`.
#
# Query can be specified in either a `like` or `q` parameter. Gives a random
# emoji from base list if nothing is specified.
get "/emoji" do |env|
  query = HTTP::Request::Emoji.query(
    body: env.params.query,
    path: env.get "path"
  )

  EMOJI.call(env, query)
end

# Returns a list of emoji related to one or more specified queries via POST.
# Request content type must be application/json
post "/emoji" do |env|
  req = HTTP::Request::Emoji.query(
    body: env.params.json,
    path: env.get "path"
  )

  EMOJI.call(env, req)
end
