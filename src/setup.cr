require "./kemal/partials"
require "./vector"

require "json"

include Partials

get "/" do
  title = "Ayaz Hafiz"
  custom_head = render "./views/head/_for-index.ecr"
  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

get "/vector" do |env|
  env.response.content_type = "application/json"
  vect_1 = gen_vector
  vect_2 = gen_vector
  {
    one: vect_1.to_s,
    two: vect_2.to_s,
    add: (vect_1 + vect_2).to_s,
    sub: (vect_1 - vect_2).to_s,
    dot: (vect_1.dot vect_2),
    cross: (vect_1.cross vect_2).to_s,
    angle: (vect_1.angle_between vect_2),
    mag_one: vect_1.magnitude,
    mag_two: vect_2.magnitude
  }.to_json
end