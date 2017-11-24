require "./api_util"

# Describes utility methods for the Try(Lang) API
module Try::Util
  extend self

  # Describes errors of the Try API
  module Error
    extend self

    include API::Util::Error

    NO_ARG = {
      error: "Must supply argument.",
    }
  end
end
