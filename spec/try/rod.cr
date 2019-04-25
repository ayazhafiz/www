require "../spec_helper"

describe "/try/rod" do
  it "renders rod playground" do
    get "/try/rod"
    response.headers["content_type"].should eq "text/html"
  end

  it "interprets rod" do
    body = {
      arg: "++*****+/(+,+++***+)",
    }
    post("/try/rod",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].should eq "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  end

  it "returns error in case of colon" do
    body = {
      arg: "++*****+/:(+,+++***+)",
    }
    post("/try/rod",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["error"].should(
      eq "Colons (`:`) are not currently supported in online mode.")
  end
end
