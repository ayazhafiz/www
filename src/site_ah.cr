require "./bin/build.cr"

require "./kemal/partials.cr"
require "./vector.cr"

Build.build

include Partials

get "/" do
  title = "Ayaz Hafiz"
  custom = render "./views/includes/_for-index.ecr"
  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

get "/vector" do
  gen_vector
end

Kemal.run