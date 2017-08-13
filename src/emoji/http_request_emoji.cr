require "./http_emoji"
require "../util/emoji_util"
require "../util/api_util"

# Handles emoji request data
module HTTP::Request::Emoji
  extend self

  include EmojiUtil
  include EmojiUtil::Alias

  # Grabs the query of an emoji request
  def query(body : HTTP::Params | JSON::Type,
            path = DEF_PATH) : JSON::Type | Err
    keys = body.is_a?(HTTP::Params) ? body.flat_map { |hs| hs.first } : body.keys
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
