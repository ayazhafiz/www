require "./kemal/partials"
require "./vector"

require "is_mobile"
require "json"

include Partials

get "/" do |env|
  title = "Ayaz Hafiz"
  custom_head = render "./views/head/_for-index.ecr"

  user_agent = env.request.headers["user-agent"]
  puts is_mobile user_agent
  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

get "/vector" do |env|
  env.response.content_type = "application/json"
  get_vector_json vect_1: gen_vector, vect_2: gen_vector
end