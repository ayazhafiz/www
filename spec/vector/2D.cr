require "../spec_helper"
require "./util"

describe "/vector::2D" do
  it "generates random 2D vector rels" do
    get "/vector"
    response.headers["content_type"].should eq "application/json"
    rels = JSON.parse response.body
    CNT.each do |key|
      puts rels[key]
      rels[key]?.nil?.should eq false
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
    resp["two"].should eq "<1, 1>"
    resp["mag_one"].should eq 1.4142135623730951
    resp["mag_two"].should eq 1.4142135623730951
    resp["add"]["vector"].should eq ({"i" => 2.0, "j" => 2.0})
    resp["add"]["string"].should eq "<2, 2>"
    resp["sub"]["vector"].should eq ({"i" => 0.0, "j" => 0.0})
    resp["sub"]["string"].should eq "0"
    resp["cross"].should eq 0.0
    resp["dot"].should eq 2.0
    resp["angle_deg"].should eq 0.0
    resp["angle_rad"].should eq 0.0
  end
end
