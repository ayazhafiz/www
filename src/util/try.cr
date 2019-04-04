require "./api"

# Describes utility methods for the Try(Lang) API
module Util::Try
  extend self

  # Describes errors of the Try API
  module Error
    extend self

    include Util::API::Error

    NO_ARG = {
      error: "Must supply argument.",
    }
  end
end
