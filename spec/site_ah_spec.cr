require "./spec_helper"

CNT = [
  "one",
  "two",
  "mag_one",
  "mag_two",
  "add",
  "sub",
  "cross",
  "dot",
  "angle_rad",
  "angle_deg",
]

describe "Cr-AH" do
  describe "/" do
    it "renders /" do
      get "/"
      response.headers["content_type"].should eq "text/html"
    end
  end

  describe "/vector" do
    it "generates random 2D vector rels" do
      get "/vector"
      response.headers["content_type"].should eq "application/json"
      rels = JSON.parse response.body
      CNT.each do |key|
        rels[key]?.nil?.should eq false
      end
    end

    it "generates random 3D vector rels" do
      get "/vector?dim=3D"
      response.headers["content_type"].should eq "application/json"
      rels = JSON.parse response.body
      CNT.each do |key|
        rels[key]?.nil?.should eq false
      end
    end

    describe "generates specified 2D vector rels" do
      it "properly responds" do
      end

      describe "handles errors" do
        it "handles missing vectors" do
          post "/vector"
          response.headers["content_type"].should eq "application/json"
          err = JSON.parse response.body
          err["error"].should eq 2
          err["message"].should eq "/vector: One or more vectors missing"
        end

        it "handles dimension mismatch" do
        end
      end
    end
  end
end
