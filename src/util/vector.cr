require "./api"
require "vector/2D"

# Referencing `Vector` in the Util::Vector module refers to the module
alias Vector2D_ = Vector

# Describes utility methods for the Vector API
module Util::Vector
  extend self

  DEF_PATH    = "/vector"
  VECTOR_FORM = "<i, j, k?>"

  # Generates a random integer in [-10, 10]
  def get_rand : Int32
    (rand * 21 - 10).to_i32
  end

  # Describes Vector API types
  module Alias
    extend self

    alias Vector2D = Vector2D_
  end

  # Describes errors of the Vector API
  module Error
    extend self

    include Util::API::Error

    NOT_PLURAL = {
      code:    2,
      message: "One or more vectors missing",
    }
    NOT_DIMENSIONAL = {
      code:    3,
      message: "Vectors not of the same dimension",
    }
    NOT_OF_FORM = {
      code:    4,
      message: "One or more vectors not in the form #{VECTOR_FORM}",
    }
  end

  # Describes constants for testing of the Vector API
  module Test
    extend self

    CNT = [
      "one",
      "two",
      "mag_one",
      "mag_two",
      "add",
      "sub",
      "cross",
      "dot",
      "angle_rad",
      "angle_deg",
    ]
  end
end
