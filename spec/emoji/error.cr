require "../spec_helper"

describe "/emoji::Error" do
  it "handles incorrect form - GET" do
    get "/emoji?similar_to:blushes"
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 2
    err["message"].should eq "GET /emoji: Query is missing the key `like` or `q`"
  end

  it "handles incorrect form - POST" do
    body = {
      "similar_to": "a fallen ship",
    }
    post("/emoji",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 2
    err["message"].should eq "POST /emoji: Query is missing the key `like` or `q`"
  end
end
