require "vector"
require "json"
require "./util/api_util"
require "./util/vector_util"
require "./vector3D"

include APIUtil::Error
include VectorUtil

# Generates a 2D or 3D vector, depending on specified dimension
def get_vector(dim : String = "2D") : Vector | Vector3D
  if dim.upcase == "3D"
    vector = get_vector3D
  else
    vector = Vector.new i: get_rand, j: get_rand
  end
end

# Generates JSON about two 2D vector relationships
def get_vector_rels(vect_1 : Vector | Vector3D,
                    vect_2 : Vector | Vector3D) : String
  if vect_1.is_a? Vector3D && vect_2.is_a? Vector3D
    get_vector3D_json vect_1: vect_1, vect_2: vect_2
  elsif vect_1.is_a? Vector2D && vect_2.is_a? Vector2D
    angle = vect_1.angle_between vect_2
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
    }.to_json
  else
    raise Exception.new "Vectors are inoperable!"
  end
end

# Processes two vectors as hashes to generate JSON about their relationships,
# with error handling included for web APIs
def process_vector_request(vect_1 : Hash | Nil = nil,
                           vect_2 : Hash | Nil = nil,
                           path : String = "/vector") : String
  if vect_1 && vect_2
    if vect_1.size == vect_2.size
      if (vect_1.keys == ["i", "j"] || vect_1.keys == ["i", "j", "k"]) &&
         (vect_2.keys == ["i", "j"] || vect_2.keys == ["i", "j", "k"])
        if vect_1.keys == ["i", "j"]
          get_vector_rels(
            vect_1: (Vector2D.from_json (vect_1.to_json)),
            vect_2: (Vector2D.from_json (vect_2.to_json))
          )
        else
          get_vector_rels(
            vect_1: (Vector3D.from_json (vect_1.to_json)),
            vect_2: (Vector3D.from_json (vect_2.to_json))
          )
        end
      else
        {
          error:   4,
          message: api_error path, VectorUtil::Error::NOT_OF_FORM,
        }.to_json
      end
    else
      {
        error:   3,
        message: api_error path, VectorUtil::Error::NOT_DIMENSIONAL,
      }.to_json
    end
  else
    {
      error:   2,
      message: api_error path, VectorUtil::Error::NOT_PLURAL,
    }.to_json
  end
end
