require "../spec_helper"

describe "/bin" do
  it "gets a script installer... installer" do
    get "/bin/enroll"
    response.headers["Location"].should eq "/scripts/enroll"
  end

  it "gets a script instller" do
    get "/bin/enroll?password=#{ENV["HAFIZ_ENROLL_PASSWORD"]}"
    response.headers["Location"].should eq ENV["HAFIZ_ENROLL_URL"]
  end
end
