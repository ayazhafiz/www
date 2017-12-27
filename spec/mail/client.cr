require "../spec_helper"
require "uri"

# These aren't very useful, currently, because of spec-kemal's limitations
describe "/mail" do
  it "renders mail page for valid user" do
    get "/mail/#{URI.escape ENV["HAFIZMAIL_USER"]}?" +
        "key=#{URI.escape ENV["HAFIZMAIL_KEY"]}"
    response.status_code.should eq 200
    response.headers["content_type"].should eq "text/html"
  end
end
