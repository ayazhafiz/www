require "../spec_helper"

describe "/emoji::Error" do
  it "handles incorrect form - POST" do
    body = [
      {
        like: "diamonds",
      },
      {
        act_as: "a description of love",
      },
    ]
    post "/emoji", headers: EmojiUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 2
    err["message"].should eq "/emoji: One or more queries missing the key `like` or `q`"
  end
end
