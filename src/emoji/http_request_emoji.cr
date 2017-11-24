require "./http_emoji"
require "../util/emoji_util"
require "../util/api_util"

# Describes methods for internal handling of Emoji API requests
module HTTP::Request::Emoji
  extend self

  include Emoji::Util
  include Emoji::Util::Alias

  # Grabs the query of an emoji request
  def query(body : HTTP::Params | JSON::Type,
            path = DEF_PATH) : JSON::Type | Err
    keys = if body.is_a?(HTTP::Params)
             body.flat_map { |hs| hs.first }
           else
             body.keys
           end
    unless (keys.reject { |w| ["like", "q"].includes? w }).size > 0
      body["like"]? || body["q"]?
    else
      Error.api(
        error: Error::NOT_OF_FORM,
        path: path
      )
    end
  end
end
