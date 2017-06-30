require "kemal"

module Partials
  extend self

  HEAD = "./views/head"
  INCL = "./views/includes"
  LAYT = "./views/layouts"

  PARTIALS = {
    meta:        "#{{{HEAD}}}/meta.ecr",
    webapp:      "#{{{HEAD}}}/webapp.ecr",
    mathjax:     "#{{{HEAD}}}/js/mathjax.ecr",
    projects:    "#{{{INCL}}}/projects.ecr",
    podd_sample: "#{{{INCL}}}/podd-sample.ecr",
    whale:       "#{{{INCL}}}/whale.ecr",
    index_head:  "#{{{HEAD}}}/_for-index.ecr",
  }
end
