require "./api_util"

module VectorUtil
  extend self

  VECTOR_FORM = "<i, j, k?>"

  alias Vector2D = Vector

  # Generates a random integer in [-10, 10]
  def get_rand : Int32
    (rand * 21 - 10).to_i32
  end

  module Error
    extend self

    NOT_PLURAL      = "One or more vectors missing"
    NOT_DIMENSIONAL = "Vectors not of the same dimension"
    NOT_OF_FORM     = "One or more vectors not in the form #{VECTOR_FORM}"
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
