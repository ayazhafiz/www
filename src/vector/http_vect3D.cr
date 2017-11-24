require "vector"
require "json"
require "../util/vector"

# Descibes methods for internal handling of the Vector(3D) API
module HTTP::Vect3D
  extend self

  include Util::Vector

  # Generates a random Vector(3D)
  def self.new : Vector3D
    Vector3D.new(
      i: get_rand,
      j: get_rand,
      k: get_rand
    )
  end

  # JSON wrapper for the Vector(3D) API
  def json(vect_1 : Vector3D,
           vect_2 : Vector3D) : NamedTuple
    angle = (vect_1.angle_between vect_2)
    angle = 0.0 if angle.nan?
    {
      one:     vect_1.to_s,
      two:     vect_2.to_s,
      mag_one: vect_1.magnitude,
      mag_two: vect_2.magnitude,
      add:     {
        vector: (vect_1 + vect_2),
        string: (vect_1 + vect_2).to_s,
      },
      sub: {
        vector: (vect_1 - vect_2),
        string: (vect_1 - vect_2).to_s,
      },
      cross: {
        vector: (vect_1.cross vect_2),
        string: (vect_1.cross vect_2).to_s,
      },
      dot:       (vect_1.dot vect_2),
      angle_rad: angle,
      angle_deg: (Vector3D.to_deg angle),
    }
  end
end
