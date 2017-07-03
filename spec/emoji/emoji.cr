require "../spec_helper"
require "./util"

describe "/emoji" do
  it "generates a random emoji" do
    get "/emoji"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    EmojiCNT_RND.each do |key|
      resp[key]?.nil?.should eq false
    end
  end

  it "generates emoji relevant to some query" do
    get "/emoji?like=diamonds"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["query"].should eq "diamonds"
    EmojiCNT.each do |key|
      resp["emoji"][key]?.nil?.should eq false
    end
  end
end
