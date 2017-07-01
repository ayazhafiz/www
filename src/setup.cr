require "json"
require "uri"
require "is_mobile"
require "./vector"
require "./kemal/partials"

include Partials

# Renders index page
get "/" do |env|
  title = "Ayaz Hafiz"
  mobile = is_mobile? env.request.headers["user-agent"]

  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

# Returns information about two vectors, random or specified. Specified vectors
# are better manipulated with `POST`
#
# Vector dimension specified by an optional `dim` query, the inference of which
# is handled by `get_vector_json`. Logs an error if vectors are not of identical
# value.
get "/vector" do |env|
  env.response.content_type = "application/json"
  dim = env.params.query["dim"]? || "2D"
  vect_1 = URI.unescape env.params.query["vect_1"] if env.params.query["vect_1"]?
  vect_2 = URI.unescape env.params.query["vect_2"] if env.params.query["vect_2"]?

  if vect_1 && vect_2 && vect_1.size == vect_2.size
    if vect_1["k"]? && vect_2["k"]?
      get_vector_json(
        vect_1: (Vector3D.from_json vect_1),
        vect_2: (Vector3D.from_json vect_2)
      )
    else
      get_vector_json(
        vect_1: (Vector2D.from_json vect_1),
        vect_2: (Vector2D.from_json vect_2)
      )
    end
  else
    get_vector_json(
      vect_1: (get_vector dim: dim),
      vect_2: (get_vector dim: dim)
    )
  end
end

# Returns information about two specified vectors (2D or 3D) via POST. Request
# content type must be application/json.
post "/vector" do |env|
  env.response.content_type = "application/json"
  vect_1 = env.params.json["vect_1"].as(Hash) if env.params.json["vect_1"]?
  vect_2 = env.params.json["vect_2"].as(Hash) if env.params.json["vect_2"]?

  if vect_1 && vect_2
    if vect_1.size == vect_2.size
      if (vect_1.keys == ["i", "j"] || vect_1.keys == ["i", "j", "k"]) &&
         (vect_2.keys == ["i", "j"] || vect_2.keys == ["i", "j", "k"])
        if vect_1.keys == ["i", "j"]
          get_vector_json(
            vect_1: (Vector2D.from_json (vect_1.to_json)),
            vect_2: (Vector2D.from_json (vect_2.to_json))
          )
        else
          get_vector_json(
            vect_1: (Vector3D.from_json (vect_1.to_json)),
            vect_2: (Vector3D.from_json (vect_2.to_json))
          )
        end
      else
        {error: 4, message: "/vector: vectors must be of form (i, j, k?)"}.to_json
      end
    else
      {error: 3, message: "/vector: vectors not of same size"}.to_json
    end
  else
    {error: 2, message: "/vector: request missing 1+ vectors"}.to_json
  end
end
