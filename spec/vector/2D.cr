require "../spec_helper"

describe "/vector::2D" do
  it "generates random 2D vector rels - GET" do
    get "/vector"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    Util::Vector::Test::CNT.each do |key|
      resp[key]?.should_not eq nil
    end
  end

  it "generates specified 2D vector rels - POST" do
    body = {
      vect_1: {
        i: 1,
        j: 1,
      },
      vect_2: {
        i: 1,
        j: 1,
      },
    }
    post("/vector",
      headers: HTTP::Headers{"content_type" => "application/json"},
      body: body.to_json)
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["one"].should eq "<1, 1>"
  end
end
