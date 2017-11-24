require "json"
require "file"

# Describes utility methods for the web server
module Util::HTTP
  extend self

  # We're in development! Probably.
  ENV["KEMAL_ENV"] ||= "development"

  # Table of partial views
  #
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

  # Table of page views
  PAGE = {
    error:      "./views/pages/error.ecr",
    index:      "./views/pages/index.ecr",
    mail:       "./views/pages/mail.ecr",
    mail_login: "./views/pages/mail-login.ecr",
    try:        "./views/pages/try.ecr",
  }

  # Table of layout views
  LAYOUT = {
    standard: "./views/layouts/standard.ecr",
  }

  # Table of values to code 302 redirect
  RD_302 = {
    "/atomas"      => "https://ayazhafiz.github.io/atomas",
    "/blog"        => "https://cc.ayazhafiz.com",
    "/cc"          => "https://cc.ayazhafiz.com",
    "/meethere"    => "https://meethere.js.org",
    "/movie-emoji" => "https://ayazhafiz.github.io/movie-emoji",
  }

  # Manifest of compiled assets
  MANIFEST = if File.file? "./src/build/webpack-manifest.json"
               JSON.parse File.read "./src/build/webpack-manifest.json"
             else
               {
                 "error.css"      => "error.css",
                 "error.js"       => "error.js",
                 "index.css"      => "index.css",
                 "index.js"       => "index.js",
                 "mail.css"       => "mail.css",
                 "mail.js"        => "mail.js",
                 "mail_login.css" => "mail_login.css",
                 "mail_login.js"  => "mail_login.js",
                 "try.rod.css"    => "try.rod.css",
                 "try.rod.js"     => "try.rod.js",
               }
             end

  # Describes methods for handling ECR on the web server
  module ECR
    extend self

    # Inlines text for the ECR template
    def inline(text : String) : String
      %{<span class="interp">\#{<span class="string">#{text}</span>}</span>}
    end
  end
end
