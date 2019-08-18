# Descibes methods for internal handling of the Enoji API.
module Util::Emoji
  extend self

  private BASE_URL = "https://glcdn.githack.com/ayazhafiz/emoji-img/raw/master/public/emoji"

  def wrap_emoji(emoji : String) : String
    "<span class=\"emoji-wrapper\">#{emoji}</span>"
  end

  # Renders an emoji image in HTML.
  def render(emoji : String,
             wrap_in : Tuple(String, String) = {"", ""},
             native_display = false,
             scale : String? = nil) : String
    result = emoji
    if emoji.starts_with?("http")
      result = render_image emoji, scale
    elsif !native_display
      result = "<img class=\"emoji\" src=\"#{get_url emoji}\">"
    end

    wrap_emoji "#{wrap_in[0]}#{result}#{wrap_in[1]}"
  end

  def render_image(url : String, scale : String?) : String
    "<img class=\"emoji #{scale}\" src=\"#{url}\" />"
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
