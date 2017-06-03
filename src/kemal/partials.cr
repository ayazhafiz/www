require "kemal"

module Partials

  extend self

  META_ = render "./views/head/meta.ecr"
  WEBAPP_ = render "./views/head/webapp.ecr"
  PRISM_ = render "./views/head/prism.ecr"
  MATHJAX_ = render "./views/head/js/mathjax.ecr"

  PROJECTS_ = render "./views/includes/projects.ecr"
end