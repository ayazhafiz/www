require "logger"
require "colorize"

# Describes utility methods for APIs
module API::Util
  extend self

  # Describes methods for handling API errors
  module Error
    # Logs API errors to STDOUT and returns an error message
    def api(error : NamedTuple,
            path,
            msg = "none") : NamedTuple
      path = path.as(String)
      log = Logger.new STDOUT
      log.level = Logger::WARN
      (
        log.warn <<-WARNING
        #{path.colorize(:yellow)}: #{error[:message].colorize(:cyan)}
        Additional information:  #{msg.colorize(:cyan)}
        WARNING
      ) unless Kemal.config.env === "test"
      {
        error:   error[:code],
        message: "#{path}: #{error[:message]}",
      }
    end
  end

  # Describes constants for testing of APIs
  module Test
    JSON_HEADERS = HTTP::Headers{
      "content_type" => "application/json",
    }
  end
end
