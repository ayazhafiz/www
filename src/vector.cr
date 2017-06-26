require "vector"
require "json"

def get_rand : Int32
  (rand * 20 - 10).to_i32
end

def gen_vector
  Vector3D.new i: get_rand, j: get_rand, k: get_rand
end

def get_vector_json(vect_1 : Vector3D, vect_2 : Vector3D)
  angle = vect_1.angle_between vect_2
  {
    one: vect_1.to_s,
    two: vect_2.to_s,
    mag_one: vect_1.magnitude,
    mag_two: vect_2.magnitude,
    add: (vect_1 + vect_2).to_s,
    sub: (vect_1 - vect_2).to_s,
    dot: (vect_1.dot vect_2),
    cross: (vect_1.cross vect_2).to_s,
    angle_rad: angle,
    angle_deg: (Vector3D.to_deg angle)
  }.to_json
end