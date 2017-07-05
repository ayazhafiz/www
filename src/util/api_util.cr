module APIUtil
  extend self

  module Error
    def api_error(path : String, error : String) : String
      "#{path}: #{error}"
    end
  end

  module Test
    JSON_HEADERS = HTTP::Headers{
      "content_type" => "application/json",
    }
  end
end
