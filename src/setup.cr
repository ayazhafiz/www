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
  get_vector_json vect_1: gen_vector, vect_2: gen_vector
end