require "../spec_helper"
require "./util"

describe "/vector::2D" do
  it "generates random 2D vector rels" do
    get "/vector"
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    VectorCNT.each do |key|
      resp[key]?.nil?.should eq false
    end
  end

  it "generates specified 2D vector rels" do
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
    post "/vector", headers: JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["one"].should eq "<1, 1>"
  end
end
