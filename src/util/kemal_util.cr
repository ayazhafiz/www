require "json"
require "file"

module KemalUtil
  extend self

  ENV["KEMAL_ENV"] ||= "development"

  # Using __DIR__ would be much easier, but the Crystal Heroku buildpack
  # saves directory state so this won't work ):
  PARTIAL = {
    index_head:  "./views/head/_for-index.ecr",
    mathjax:     "./views/head/js/mathjax.ecr",
    meta:        "./views/head/meta.ecr",
    podd_sample: "./views/includes/podd-sample.ecr",
    projects:    "./views/includes/projects.ecr",
    webapp:      "./views/head/webapp.ecr",
    whale:       "./views/includes/whale.ecr",
  }

  PAGE = {
    error: "./views/pages/error.ecr",
    index: "./views/pages/index.ecr",
    try:   "./views/pages/try.ecr",
  }

  LAYOUT = {
    standard: "./views/layouts/standard.ecr",
  }

  MANIFEST = if File.file? "./src/build/webpack-manifest.json"
               JSON.parse File.read "./src/build/webpack-manifest.json"
             else
               {
                 "error.css"   => "error.css",
                 "error.js"    => "error.js",
                 "index.css"   => "index.css",
                 "index.js"    => "index.js",
                 "try.rod.css" => "try.rod.css",
                 "try.rod.js"  => "try.rod.js",
               }
             end

  def inline(text : String) : String
    %{<span class="interp">\#{<span class="string">#{text}</span>}</span>}
  end
end
