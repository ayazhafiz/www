Kemal.config.env = "test"
require "spec"
require "spec-kemal"
require "json"
require "../src/site"
require "../src/util/vector"

Spec.before_each do
  Kemal.config.setup
end
