require "./api"

# Describes utility methods for the math API
module Util::RMath
  extend self

  DEF_PATH = "/math"

  # Describes errors of the Vector API
  module Error
    extend self

    include Util::API::Error

    NOT_EMBEDDED = {
      code:    1,
      message: "Expression not specified",
    }

    def gen(msg)
      {
        code:    2,
        message: msg,
      }
    end
  end
end
