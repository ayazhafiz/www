require "spec"
require "spec-kemal"
require "json"
require "../src/setup"

Spec.before_each do
  config = Kemal.config
  config.env = "test"
  config.setup
end

Spec.after_each do
  Kemal.config.clear
end
