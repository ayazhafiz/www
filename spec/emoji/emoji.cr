require "../spec_helper"

describe "/emoji" do
  it "generates a random emoji - GET" do
    get "/emoji"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    EmojiUtil::Test::CNT_RND.each do |key|
      resp[key]?.nil?.should eq false
    end
  end

  it "generates a random emoji - POST" do
    post "/emoji", headers: EmojiUtil::Test::JSON_HEADERS
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    EmojiUtil::Test::CNT_RND.each do |key|
      resp[key]?.nil?.should eq false
    end
  end

  it "generates emoji relevant to some query - GET" do
    get "/emoji?like=diamonds"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["query"].should eq "diamonds"
    resp["emoji"].each do |emoji|
      EmojiUtil::Test::CNT.each do |key|
        emoji[key]?.nil?.should eq false
      end
    end
  end

  it "generates emoji relevant to some query - POST" do
    body = {
      like: "diamonds in the rough",
    }
    post "/emoji", headers: EmojiUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["query"].should eq "diamonds in the rough"
    resp["emoji"].each do |emoji|
      EmojiUtil::Test::CNT.each do |key|
        emoji[key]?.nil?.should eq false
      end
    end
  end

  it "generates emoji relevant to multiple query - POST" do
    body = [
      {
        like: "diamonds",
      },
      {
        q: "a description of love",
      },
    ]
    post "/emoji", headers: EmojiUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp[0]["query"].should eq "diamonds"
    resp[1]["query"].should eq "a description of love"
    resp.each do |ct|
      ct["emoji"].each do |emoji|
        EmojiUtil::Test::CNT.each do |key|
          emoji[key]?.nil?.should eq false
        end
      end
    end
  end
end
