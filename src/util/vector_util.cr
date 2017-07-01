module VectorUtil
  extend self

  alias Vector2D = Vector

  # Generates a random integer in [-10, 10]
  def get_rand : Int32
    (rand * 21 - 10).to_i32
  end
end
