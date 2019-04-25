require "../spec_helper"

describe "/" do
  it "renders /" do
    get "/"
    response.headers["content_type"].should eq "text/html"
  end
end

describe "renders in the correct language" do
  it "English" do
    get "/"
    response.headers["Content-Language"].should eq "en"
  end

  it "Russian" do
    get "/ru"
    response.headers["Content-Language"].should eq "ru"
  end

  it "renders 404 for unsupported languages" do
    get "/esketit"
    response.headers["Content-Language"].should eq "en"
    response.status_code.should eq 404
  end
end
