require "./kemal/partials"
require "./vector"

require "is_mobile"
require "json"

include Partials

get "/" do |env|
  title = "Ayaz Hafiz"
  mobile = is_mobile? env.request.headers["user-agent"]

  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

get "/vector" do |env|
  env.response.content_type = "application/json"
  get_vector_json vect_1: get_vector, vect_2: get_vector
end
