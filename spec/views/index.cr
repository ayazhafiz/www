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

  it "gives English for untranslated language" do
    get "/esketit"
    response.headers["Content-Language"].should eq "en"
    response.headers["Location"].should eq "/"
    response.status_code.should eq 302
  end
end
