require "kemal"

module Partials

  extend self

  META_ = render "./views/includes/meta.ecr"
  WEBAPP_ = render "./views/includes/webapp.ecr"
  STYLES_ = render "./views/includes/styles.ecr"
  FONTS_ = render "./views/includes/fonts.ecr"
  PRISM_ = render "./views/includes/prism.ecr"
  MATHJAX_ = render "./views/includes/js/mathjax.ecr"
end