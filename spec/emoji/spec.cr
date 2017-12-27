require "../spec_helper"

describe "/emoji::Spec" do
  it "generates emoji relevant to some query - GET" do
    get "/emoji?like=diamonds"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    unless resp["error"]? === 1
      resp["query"].should eq "diamonds"
      resp["emoji"].each do |emoji|
        Util::Emoji::Test::CNT.each do |key|
          emoji[key]?.should_not eq nil
        end
      end
    end
  end

  it "generates emoji relevant to some query - POST" do
    body = {
      "like": "diamonds in the rough",
    }
    post("/emoji",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    unless resp["error"]? === 1
      resp["query"].should eq "diamonds in the rough"
      resp["emoji"].each do |emoji|
        Util::Emoji::Test::CNT.each do |key|
          emoji[key]?.should_not eq nil
        end
      end
    end
  end

  it "generates emoji relevant to multiple query - POST" do
    body = {
      "like": [
        "diamonds",
        "a description of love",
      ],
    }
    post("/emoji",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    unless resp[0]["error"]? === 1
      resp[0]["query"].should eq "diamonds"
      resp[1]["query"].should eq "a description of love"
      resp.each do |ct|
        ct["emoji"].each do |emoji|
          Util::Emoji::Test::CNT.each do |key|
            emoji[key]?.should_not eq nil
          end
        end
      end
    end
  end
end
