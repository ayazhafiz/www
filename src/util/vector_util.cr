require "./api_util"

module VectorUtil
  extend self

  DEF_PATH    = "/vector"
  VECTOR_FORM = "<i, j, k?>"

  # Generates a random integer in [-10, 10]
  def get_rand : Int32
    (rand * 21 - 10).to_i32
  end

  module Alias
    alias Vector2D = Vector
  end

  module Error
    extend self

    include APIUtil::Error

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

  module Test
    extend self
    include APIUtil::Test
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
