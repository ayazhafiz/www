require "../spec_helper"

describe "/math::Spec" do
  it "evaluates mathematical expressions - POST" do
    body = {
      "program": "2 ^ 10 / 5! * 3",
    }
    post("/math",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    unless resp["error"]?
      resp["result"].should eq "25.6"
    end
  end
end
