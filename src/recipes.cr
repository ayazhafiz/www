require "db"
require "pg"
require "kemal"

DB.open ENV["RECIPES_DB"] do |db|
  # Renders landing page
  get "/recipes" do |env|
    page = "recipes"
    title = "Recipes"

    render {{ PAGE[:recipes] }}, {{ LAYOUT[:standard] }}
  end
end
