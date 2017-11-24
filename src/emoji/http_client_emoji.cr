require "http/client"
require "../util/emoji_util"
require "../util/api_util"

# Describes methods for internal handling of external Emoji API
module HTTP::Client::Emoji
  extend self

  include Emoji::Util
  include Emoji::Util::Alias

  # Sends and processes request for emoji from an external API
  #
  # Current API used is [Dango](https://getdango.com)
  def get(query : String,
          path = DEF_PATH) : JSON::Any | Err
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
      Error.api(
        error: Error::NOT_CONNECTED,
        path: path,
        msg: connection_exc.message
      )
    else
      JSON.parse(response.body)["results"]? ||
        Error.api(
          error: Error::NOT_RESPONSIVE,
          path: path,
          msg: JSON.parse(response.body)["message"]
        )
    end
  end
end
