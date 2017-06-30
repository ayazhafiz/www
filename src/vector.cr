require "vector"
require "json"
require "./util/vector_util"
require "./vector3D"

include VectorUtil

def get_vector(dim : String = "2D") : Vector | Vector3D
  if dim.upcase == "3D"
    get_vector3D
  else
    Vector.new i: get_rand, j: get_rand
  end
end

def get_vector_json(vect_1 : Vector | Vector3D,
                    vect_2 : Vector | Vector3D,
                    dim : String = "not") : String
  if dim.upcase == "3D" && vect_1.is_a?(Vector3D) && vect_2.is_a?(Vector3D)
    get_vector3D_json vect_1: vect_1, vect_2: vect_2
  elsif vect_1.is_a?(Vector2D) && vect_2.is_a?(Vector2D)
    angle = vect_1.angle_between vect_2
    {
      one:       vect_1.to_s,
      two:       vect_2.to_s,
      mag_one:   vect_1.magnitude,
      mag_two:   vect_2.magnitude,
      add:       (vect_1 + vect_2).to_s,
      sub:       (vect_1 - vect_2).to_s,
      dot:       (vect_1.dot vect_2),
      cross:     (vect_1.cross vect_2).to_s,
      angle_rad: angle,
      angle_deg: (Vector.to_deg angle),
    }.to_json
  else
    raise "Vectors are inoperable!"
  end
end
