require "logger"
require "colorize"

module APIUtil
  extend self

  module Error
    def api(error : NamedTuple,
            path,
            msg = "none") : NamedTuple
      path = path.as(String)
      log = Logger.new STDOUT
      log.level = Logger::WARN
      log.warn <<-WARNING
      #{path.colorize(:yellow)}: #{error[:message].colorize(:cyan)}
      Additional information:  #{msg.colorize(:cyan)}
      WARNING
      {
        error:   error[:code],
        message: "#{path}: #{error[:message]}",
      }
    end
  end

  module Test
    JSON_HEADERS = HTTP::Headers{
      "content_type" => "application/json",
    }
  end
end
