require "../spec_helper"

describe "/math::Error" do
  it "handles incorrect form - POST" do
    body = {
      "program": "2 ^ 3a",
    }
    post("/math",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 2
    err["message"].should eq <<-ERR
    POST /math: InvalidCharacter: Expected Token, found unknown character.
    ERR
  end
end
