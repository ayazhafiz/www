require "../spec_helper"

describe "/emoji::Rand" do
  it "generates a random emoji - GET" do
    get "/emoji"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    Emoji::Util::Test::CNT_RND.each do |key|
      resp[key]?.should_not eq nil
    end
  end

  it "generates a random emoji - POST" do
    post "/emoji", headers: Emoji::Util::Test::JSON_HEADERS
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    Emoji::Util::Test::CNT_RND.each do |key|
      resp[key]?.should_not eq nil
    end
  end
end
