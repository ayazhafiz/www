require "../spec_helper"

describe "/bios" do
  it "renders /bios" do
    get "/bios"
    response.status_code.should eq 200
    response.headers["content_type"].should eq "text/html"
  end
end
