require "./spec_helper"

describe "Vector API" do
  it "can create vector" do
    typeof(get_vector).should eq Vector2D | Vector3D
  end

  it "properly declares 2D vector" do
    (Vector.new).to_s.should eq "<1, 1>"
  end

  it "properly declares 3D vector" do
    (Vector3D.new).to_s.should eq "<1, 1, 1>"
  end

  it "generates accurate 2D vector json" do
    get_vector_json(
      vect_1: (Vector2D.from_json %({"i":1,"j":1})),
      vect_2: (Vector2D.from_json %({"i":1,"j":1}))
    ).should eq %({"one":"<1, 1>","two":"<1, 1>","mag_one":1.4142135623730951,"mag_two":1.4142135623730951,"add":"<2, 2>","sub":"0","dot":2.0,"cross":"0.0","angle_rad":0.0,"angle_deg":0.0})
  end

  it "generates accurate 3D vector json" do
    get_vector_json(
      vect_1: (Vector3D.from_json %({"i":1,"j":1,"k":1})),
      vect_2: (Vector3D.from_json %({"i":1,"j":1,"k":1}))
    ).should eq %({"one":"<1, 1, 1>","two":"<1, 1, 1>","mag_one":1.7320508075688772,"mag_two":1.7320508075688772,"add":"<2, 2, 2>","sub":"0","dot":3.0,"cross":"0","angle_rad":0.0,"angle_deg":0.0})
  end
end
