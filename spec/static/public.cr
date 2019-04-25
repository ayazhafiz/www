require "../spec_helper"

describe "/public" do
  it "gzips files" do
    config = Kemal.config.serve_static
    config.is_a?(Hash).should eq true
    if config.is_a? Hash
      config["gzip"].should eq true
    end
  end

  it "has no directory listing" do
    config = Kemal.config.serve_static
    config.is_a?(Hash).should eq true
    if config.is_a? Hash
      config["dir_listing"].should eq false
    end
  end
end
