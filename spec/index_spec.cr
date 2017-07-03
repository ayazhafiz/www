require "./spec_helper"

describe "/" do
  it "renders /" do
    get "/"
    response.headers["content_type"].should eq "text/html"
  end
end
