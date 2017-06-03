require "vector"

def get_rand : Int32
  (rand * 20 - 10).to_i32
end

def gen_vector
  Vector3D.new i: get_rand, j: get_rand, k: get_rand
end