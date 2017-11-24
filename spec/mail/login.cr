require "../spec_helper"

# These aren't very useful, currently, because of spec-kemal's limitations
describe "/mail" do
  it "renders mail login" do
    get "/mail"
    response.headers["content_type"].should eq "text/html"
  end
  it "renders mail login with user placeholder" do
    get "/mail/randomUserName"
    response.headers["content_type"].should eq "text/html"
  end
  it "renders mail login page for invalid user" do
    get "/mail/randomUserName?key=definitelyIncorrect"
    response.status_code.should eq 200
    response.headers["content_type"].should eq "text/html"
  end
end
