require "../spec_helper"

describe "Redirect::301" do
  it "redirects atomas" do
    get "/atomas"
    response.headers["Location"].should eq "https://ayazhafiz.github.io/atomas"
  end
  describe "redirects blog" do
    it "does it via /blog" do
      get "/blog"
      response.headers["Location"].should eq "https://cc.ayazhafiz.com"
    end
    it "does it via /cc" do
      get "/cc"
      response.headers["Location"].should eq "https://cc.ayazhafiz.com"
    end
  end
  it "redirects meetHere" do
    get "/meethere"
    response.headers["Location"].should eq "https://meethere.js.org"
  end
end
