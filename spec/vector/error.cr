require "../spec_helper"

describe "/vector::Error" do
  it "handles missing vectors - POST" do
    post "/vector"
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 2
    err["message"].should eq "POST /vector: One or more vectors missing"
  end

  it "handles dimension mismatch - POST" do
    body = {
      vect_1: {
        i: 1,
        j: 1,
      },
      vect_2: {
        i: 1,
        j: 1,
        k: 1,
      },
    }
    post "/vector", headers: VectorUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 3
    err["message"].should eq "POST /vector: Vectors not of the same dimension"
  end

  it "handles incorrect form - POST - 2D " do
    body = {
      vect_1: {
        i: 1,
        j: 1,
      },
      vect_2: {
        x: 1,
        y: 1,
      },
    }
    post "/vector", headers: VectorUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 4
    err["message"].should eq(
      "POST /vector: One or more vectors not in the form <i, j, k?>"
    )
  end

  it "handles incorrect form - POST - 3D" do
    body = {
      vect_1: {
        i: 1,
        j: 1,
        k: 1,
      },
      vect_2: {
        x: 1,
        y: 1,
        z: 1,
      },
    }
    post "/vector", headers: VectorUtil::Test::JSON_HEADERS, body: body.to_json
    response.headers["content_type"].should eq "application/json"
    err = JSON.parse response.body
    err["error"].should eq 4
    err["message"].should eq(
      "POST /vector: One or more vectors not in the form <i, j, k?>"
    )
  end
end
