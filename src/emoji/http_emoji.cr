require "http/client"
require "json"
require "uri"
require "./http_client_emoji"
require "./http_request_emoji"
require "../util/emoji_util"
require "../util/api_util"

module HTTP::Emoji
  extend self

  include EmojiUtil
  include EmojiUtil::Alias
  include APIUtil::Error

  # Handles all emoji queries
  #
  # Sources handling different data types via type inference
  def emoji_like(query : JSON::Type,
                 path : String = DEF_PATH) : Any | Array(Any)
    if query.nil?
      process
    elsif query.is_a? String
      process(
        query: query,
        path: path
      )
    else
      HTTP::Request::Emoji.process_json(
        body: query,
        path: path
      )
    end
  end

  # Retrieves one, random emoji
  private def process
    emoji = EMOJI.sample(1)[0]
    def_emoji emoji: emoji
  end

  # Retrieves emoji relevant to some specified query
  private def process(query : String,
                      path : String = DEF_PATH) : MassJSON | Err
    emoji = HTTP::Client::Emoji.get_emoji query: query, path: path
    unless emoji.is_a? Err
      process(
        response: emoji,
        query: query
      )
    else
      emoji
    end
  end

  # Generates Array of relevant emoji information by comparing and compiling
  # relevant emoji to base list
  private def process(response relevant : JSON::Any,
                      query : String) : MassJSON
    response = [] of HashJSON
    relevant.each do |base|
      EMOJI.each do |emoji|
        if base["text"] == emoji[:char]
          response << def_emoji(
            emoji: emoji,
            base: base
          )
        end
      end
    end
    bundle_query value: response, query: query
  end

  # Generates defenition of an emoji given its master list key and optional
  # relevance to specified query
  private def def_emoji(emoji : NamedTuple,
                        base : JSON::Any | Nil = nil) : HashJSON
    entry = {} of String => String | JSON::Any
    entry["char"] = emoji[:char]
    entry["name"] = emoji[:name]
    entry["code"] = emoji[:code]
    entry["relevance"] = base["score"] if base
    entry
  end

  # Bundles specified query with some given value
  private def bundle_query(value : HashJSON | Array(HashJSON),
                           query : String) : MassJSON
    {
      "query" => query,
      "emoji" => value,
    }
  end
end
