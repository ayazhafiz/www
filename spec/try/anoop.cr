require "../spec_helper"

MUSTACHE_LENGTH = 1101

describe "/try/anoop" do
  it "renders Anoop playground" do
    get "/try/anoop"
    response.headers["content_type"].should eq "text/html"
  end

  it "requires two or more o's in Anoop" do
    body = {
      arg: "Anop",
    }
    post("/try/anoop",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].should eq "Two `o`s in the name. Eat my ass."
  end

  it "interprets Anoop with two o's" do
    body = {
      arg: "Anoop",
    }
    post("/try/anoop",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].as_s.size.should eq MUSTACHE_LENGTH
  end

  it "interprets Anoop with more than two o's" do
    body = {
      arg: "Anoooooop",
    }
    post("/try/anoop",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].as_s.size.should eq MUSTACHE_LENGTH
  end

  it "requires name capitalization" do
    body = {
      arg: "anoop",
    }
    post("/try/anoop",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].should eq "Capitalize the FUCKING name!"
  end

  it "requires singular name" do
    body = {
      arg: "A noop",
    }
    post("/try/anoop",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].should eq "Anoop is one name!"
  end

  it "requires correct spelling" do
    body = {
      arg: "An00p",
    }
    post("/try/anoop",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["success"].should(
      eq "Bitch, his name is spelled with `A`, `n`, `o`, and `p`.")
  end
end
