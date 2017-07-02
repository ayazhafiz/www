module APIUtil
  extend self

  module Error
    def api_error(path : String, error : String) : String
      "#{path}: #{error}"
    end
  end
end
