# Descibes methods for internal handling of the Enoji API.
module Util::Emoji
  extend self

  private BASE_URL = "https://glcdn.githack.com/ayazhafiz/emoji-img/raw/master/public/"

  # Renders an emoji image in HTML.
  def render(emoji : String,
             base_url : String = BASE_URL,
             native_display = false) : String
    if native_display
      emoji
    else
      <<-HTML
      <img class="emoji" src="#{get_url emoji}">
      HTML
    end
  end

  # Returns the filename of an emoji image.
  private def get_url(emoji : String, base_url : String = BASE_URL) : String
    "#{base_url}/unicode/#{get_codepoint emoji}.png"
  end

  # Returns the codepoint of some emoji character.
  private def get_codepoint(emoji : String) : String
    res = [] of String

    emoji.each_char do |ch|
      res << ch.ord.to_s(16).rjust(4, '0')
    end

    res.join('-').gsub(/-(fe0f|200d)\b/, "")
  end
end
