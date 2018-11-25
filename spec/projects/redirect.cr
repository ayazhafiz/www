require "../spec_helper"

describe "Redirect::302" do
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
  it "redirects position" do
    get "/position"
    response.headers["Location"].should eq "https://ayazhafiz.github.io/position"
  end
  it "redirects Movie Emoji" do
    get "/movie-emoji"
    response.headers["Location"].should(
      eq "https://ayazhafiz.github.io/movie-emoji")
  end
end
