require "http/client"
require "json"
require "uri"
require "./util/emoji_util"
require "./util/api_util"

include APIUtil::Error
include EmojiUtil

alias HashJSON = Hash(String, String | JSON::Any)
alias MassJSON = Hash(String, String | Array(HashJSON))

# Retrieves emoji relevant to some specified query
def get_emoji(query : String,
              type : String = "Array",
              path : String = "emoji") : MassJSON | String
  params = HTTP::Params.build do |form|
    form.add API_QUERY, query
  end
  request = URI.new(
    scheme: "https",
    host: API_HOST,
    path: API_PATH,
    query: params
  )
  begin
    response = HTTP::Client.get request
  rescue connection_exc
    puts "Connection Failure: #{connection_exc.message}"
    {
      error:   1,
      message: api_error path, EmojiUtil::Error::NOT_CONNECTED,
    }.to_json
  else
    emoji = JSON.parse response.body
    emoji = process_response response: emoji["results"], query: query
    process_type value: emoji, type: type
  end
end

# Retrieves one, random emoji
def get_random_emoji(type : String = "Hash") : HashJSON | String
  emoji = EMOJI.sample(1)[0]
  emoji = def_emoji emoji: emoji
  process_type value: emoji, type: type
end

# Generates Array of relevant emoji information by comparing and compiling
# relevant emoji to base list
private def process_response(response relevant : JSON::Any,
                             query : String) : MassJSON
  response = [] of HashJSON
  relevant.each do |base|
    EMOJI.each do |emoji|
      if base["text"] == emoji[:char]
        response << def_emoji emoji: emoji, base: base
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

# Returns json-ified version of some value if requested
private def process_type(value, type : String = "NotJSON")
  unless type.downcase == "json"
    value
  else
    value.to_json
  end
end
