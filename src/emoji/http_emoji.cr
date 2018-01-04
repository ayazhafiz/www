require "http/client"
require "json"
require "uri"
require "./http_client_emoji"
require "./http_request_emoji"
require "../util/emoji"

# Descibes methods for internal handling of the Enoji API.
module HTTP::Emoji
  extend self

  include Util::Emoji
  include Util::Emoji::Alias

  private BASE_URL = "https://assets-cdn.github.com/images/icons/emoji"

  # Renders an emoji image in HTML.
  def render(emoji : String,
             base_url : String = BASE_URL,
             raw? = false) : String
    return emoji if raw?
    path = url emoji, base_url
    <<-HTML
    <img class="emoji" src="#{path}">
    HTML
  end

  # Handles all emoji queries.
  #
  # Sources handling different data types via type inference.
  def like(query : Query,
           path = DEF_PATH) : Any | Array(Any)
    if query.is_a? Err
      query
    elsif query.nil?
      process
    elsif query.is_a? String
      process(
        query: query,
        path: path
      )
    else
      process(
        body: query,
        path: path
      )
    end
  end

  # Retrieves one, random emoji.
  private def process
    emoji = EMOJI.sample(1)[0]
    define emoji: emoji
  end

  # Returns the filename of an emoji image.
  private def url(emoji : String, base_url : String) : String
    "#{base_url}/unicode/#{codepoint(emoji)}.png"
  end

  # Returns the codepoint of some emoji character.
  private def codepoint(emoji : String) : String
    res = [] of String

    emoji.each_char do |c|
      res << c.ord.to_s(16).rjust(4, '0')
    end

    res.join('-').gsub(/-(fe0f|200d)\b/, "")
  end

  # Retrieves emoji relevant to some specified query.
  private def process(query : String,
                      path = DEF_PATH) : MassJSON | Err
    emoji = HTTP::Client::Emoji.get(
      query: query,
      path: path
    )
    unless emoji.is_a? Err
      process(
        response: emoji,
        query: query
      )
    else
      emoji
    end
  end

  # Processes a JSON Array of multiple emoji requests concurrently.
  private def process(body,
                      path = DEF_PATH) : Err | Array(Any)
    ch = Channel(Nil).new
    body = body.as(Array)
    resp = Array.new(
      size: body.size,
      value: nil.as(Any)
    )
    body.each do |query|
      spawn do
        idx = body.as(Array).index { |itr| itr === query } || -1

        resp[idx] = like(
          query: query.as(String),
          path: path
        )
        ch.send nil
      end
    end
    body.as(Array).size.times { ch.receive }
    resp
  end

  # Generates Array of relevant emoji information by comparing and compiling
  # relevant emoji to base list.
  private def process(response relevant : JSON::Any,
                      query : String) : MassJSON
    response = [] of HashJSON
    relevant.each do |base|
      EMOJI.each do |emoji|
        if base["text"] === emoji[:char]
          response << define(
            emoji: emoji,
            base: base
          )
        end
      end
    end
    bundle value: response, query: query
  end

  # Generates defenition of an emoji given its master list key and optional
  # relevance to specified query.
  private def define(emoji : NamedTuple,
                     base : JSON::Any? = nil) : HashJSON
    entry = {} of String => String | JSON::Any
    entry["char"] = emoji[:char]
    entry["name"] = emoji[:name]
    entry["code"] = emoji[:code]
    entry["relevance"] = base["score"] if base
    entry
  end

  # Bundles specified query with some given value.
  private def bundle(value : HashJSON | Array(HashJSON),
                     query : String) : MassJSON
    {
      "query" => query,
      "emoji" => value,
    }
  end
end
