require "../spec_helper"

describe "/notes" do
  it "renders /notes" do
    get "/notes"
    response.status_code.should eq 200
    response.headers["content_type"].should eq "text/html"
  end
end
