require "./http_emoji"
require "../util/emoji_util"
require "../util/api_util"

# Handles emoji request data
module HTTP::Request::Emoji
  extend self

  include EmojiUtil
  include EmojiUtil::Alias
  include APIUtil::Error

  # Grabs the query of an emoji request
  def get_q(body)
    body["like"]? || body["q"]?
  end

  # Processes a JSON Array of multiple emoji requests
  def process_json(body : JSON::Type,
                   path : String) : Err | Array(Any)
    resp = [] of MassJSON | HashJSON | Err
    body.as(Array).each do |query|
      like = get_q query.as(Hash)
      unless like.nil?
        resp << HTTP::Emoji.emoji_like(
          query: like.as(String),
          path: path
        )
      else
        resp = {
          error:   2,
          message: api_error path, Error::NOT_OF_FORM,
        }
        break
      end
    end
    resp
  end
end
