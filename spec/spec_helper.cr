require "spec"
require "spec-kemal"
require "json"
require "../src/setup"
require "../src/util/vector_util"
require "../src/util/emoji_util"

Spec.before_each do
  config = Kemal.config
  config.env = "test"
  config.setup
end

Spec.after_each do
  Kemal.config.clear
end
