Kemal.config.env = "test"
require "spec"
require "spec-kemal"
require "json"
require "../src/site"
require "../src/util/vector_util"
require "../src/util/emoji_util"

Spec.before_each do
  Kemal.config.setup
end
