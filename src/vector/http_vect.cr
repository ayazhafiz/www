require "vector"
require "json"
require "../util/api"
require "../util/vector"
require "./http_vect3D"

# Descibes methods for internal handling of the Vector(2D) API
module HTTP::Vect
  extend self

  include Util::Vector
  include Util::Vector::Alias

  # Generates a random Vector(2D)
  def self.new : Vector2D
    Vector2D.new(
      i: get_rand,
      j: get_rand
    )
  end

  # Generates JSON about two 2D vector relationships
  def rels(dim : String = "2D",
           path = DEF_PATH) : NamedTuple
    if dim.upcase === "3D"
      HTTP::Vect3D.json(
        vect_1: HTTP::Vect3D.new,
        vect_2: HTTP::Vect3D.new
      )
    elsif dim.upcase === "2D"
      HTTP::Vect.json(
        vect_1: HTTP::Vect.new,
        vect_2: HTTP::Vect.new
      )
    else
      Error.api(
        error: Error::NOT_PLURAL,
        path: path
      )
    end
  end

  # Processes two vectors as hashes to generate JSON about their relationships,
  # with error handling included for web APIs
  def rels(vect_1 : Hash? = nil,
           vect_2 : Hash? = nil,
           path = DEF_PATH) : NamedTuple
    if vect_1 && vect_2
      if vect_1.size === vect_2.size
        if vect_1.keys & ["i", "j"] == ["i", "j"] &&
           vect_2.keys & ["i", "j"] == ["i", "j"]
          if vect_1.keys === ["i", "j"]
            HTTP::Vect.json(
              vect_1: (Vector2D.from_json (vect_1.to_json)),
              vect_2: (Vector2D.from_json (vect_2.to_json))
            )
          else
            HTTP::Vect3D.json(
              vect_1: (Vector3D.from_json (vect_1.to_json)),
              vect_2: (Vector3D.from_json (vect_2.to_json))
            )
          end
        else
          Error.api(
            error: Error::NOT_OF_FORM,
            path: path
          )
        end
      else
        Error.api(
          error: Error::NOT_DIMENSIONAL,
          path: path
        )
      end
    else
      Error.api(
        error: Error::NOT_PLURAL,
        path: path
      )
    end
  end

  # JSON wrapper for the Vector(2D) API
  def json(vect_1 : Vector2D,
           vect_2 : Vector2D) : NamedTuple
    angle = (vect_1.angle_between vect_2)
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
      cross:     (vect_1.cross vect_2),
      dot:       (vect_1.dot vect_2),
      angle_rad: angle,
      angle_deg: (Vector.to_deg angle),
    }
  end
end
