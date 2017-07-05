require "../spec_helper"

describe "/vector::3D" do
  it "generates random 3D vector rels - GET" do
    get "/vector?dim=3D"
    response.headers["content_type"].should eq "application/json"
    rels = JSON.parse response.body
    VectorUtil::Test::CNT.each do |key|
      rels[key]?.nil?.should eq false
    end
  end

  it "generates specified 3D vector rels - POST" do
    body = {
      vect_1: {
        i: 1,
        j: 1,
        k: 1,
      },
      vect_2: {
        i: 1,
        j: 1,
        k: 1,
      },
    }
    post "/vector", headers: VectorUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    resp = JSON.parse response.body
    resp["one"].should eq "<1, 1, 1>"
    resp["two"].should eq "<1, 1, 1>"
    resp["mag_one"].should eq 1.7320508075688772
    resp["mag_two"].should eq 1.7320508075688772
    resp["add"]["vector"].should eq ({"i" => 2.0, "j" => 2.0, "k" => 2.0})
    resp["add"]["string"].should eq "<2, 2, 2>"
    resp["sub"]["vector"].should eq ({"i" => 0.0, "j" => 0.0, "k" => 0.0})
    resp["sub"]["string"].should eq "0"
    resp["cross"]["vector"].should eq ({"i" => 0.0, "j" => 0.0, "k" => 0.0})
    resp["cross"]["string"].should eq "0"
    resp["dot"].should eq 3.0
    resp["angle_deg"].should eq 0.0
    resp["angle_rad"].should eq 0.0
  end
end
