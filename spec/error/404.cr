require "../spec_helper"

describe "Error::404" do
  it "does GET" do
    get "/error/404"
    response.headers["content_type"].should eq "text/html"
    response.status_code.should eq 404
  end

  it "does POST" do
    post "/error/404"
    response.headers["content_type"].should eq "text/html"
    response.status_code.should eq 404
  end
end
