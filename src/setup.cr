require "./kemal/partials"
require "./vector"

include Partials

get "/" do
  title = "Ayaz Hafiz"
  custom_head = render "./views/head/_for-index.ecr"
  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

get "/vector" do
  gen_vector
end