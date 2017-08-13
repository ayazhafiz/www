require "../spec_helper"

describe "Error::500" do
  it "does GET" do
    get "/error/500"
    response.headers["content_type"].should eq "text/html"
    response.status_code.should eq 500
  end

  it "does POST" do
    post "/error/500"
    response.headers["content_type"].should eq "text/html"
    response.status_code.should eq 500
  end
end
