require "../spec_helper"

describe "/recipes" do
  it "renders /recipes" do
    get "/recipes"
    response.status_code.should eq 200
    response.headers["content_type"].should eq "text/html"
  end
end
