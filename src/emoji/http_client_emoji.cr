require "http/client"
require "../util/emoji_util"
require "../util/api_util"

# Handles external API requests
module HTTP::Client::Emoji
  extend self

  include EmojiUtil
  include EmojiUtil::Alias
  include APIUtil::Error

  # Sends and processes request for emoji from an external API
  #
  # Current API used is [Dango](https://getdango.com)
  def get_emoji(query : String,
                path : String = DEF_PATH) : JSON::Any | Err
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
      puts "/vector external API connection failure: #{connection_exc.message}"
      {
        error:   1,
        message: api_error path, Error::NOT_CONNECTED,
      }
    else
      JSON.parse(response.body)["results"]
    end
  end
end
