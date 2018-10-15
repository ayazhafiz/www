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
    analytics:   "./views/head/analytics.ecr",
    index_head:  "./views/head/_for-index-ui.ecr",
    mathjax:     "./views/head/js/mathjax.ecr",
    meta:        "./views/head/meta.ecr",
    podd_sample: "./views/includes/podd-sample.ecr",
    projects:    "./views/includes/projects.ecr",
    webapp:      "./views/head/webapp.ecr",
    whale:       "./views/includes/whale.ecr",
    section:     [
      {
        emoji: "📦",
        tag:   "projects",
        view:  "./views/includes/sections/projects.ecr",
      },
      {
        emoji: "👩‍🔬",
        tag:   "work",
        view:  "./views/includes/sections/work.ecr",
      },
      {
        emoji: "🍍",
        tag:   "about",
        view:  "./views/includes/sections/about.ecr",
      },
      {
        emoji: "🔗",
        tag:   "links",
        view:  "./views/includes/sections/links.ecr",
      },
    ],
  }

  # Table of page views
  PAGE = {
    error:      "./views/pages/error.ecr",
    index:      "./views/pages/index.ecr",
    index_ui:   "./views/pages/index-ui.ecr",
    mail:       "./views/pages/mail.ecr",
    mail_login: "./views/pages/mail-login.ecr",
    notes:      "./views/pages/notes.ecr",
    recipes:    "./views/pages/recipes.ecr",
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
  MANIFEST = if File.readable? "./src/build/webpack-manifest.json"
               JSON.parse File.read "./src/build/webpack-manifest.json"
             end

  def read_manifest(file : String)
    (man = MANIFEST) ? man[file] : file
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
