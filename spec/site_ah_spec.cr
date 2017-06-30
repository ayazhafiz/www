require "./spec_helper"

describe "Site" do
  it "instantiates vector" do
    typeof(get_vector).should eq Vector3D
  end

  it "properly declares vector" do
    (Vector3D.new).to_s.should eq "<1, 1, 1>"
  end
end
