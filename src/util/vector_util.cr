module VectorUtil
  extend self

  alias Vector2D = Vector

  def get_rand : Int32
    (rand * 20 - 10).to_i32
  end
end
