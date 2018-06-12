require "db"
require "pg"
require "kemal"

RECIPES = [
  {
    title:       "Some recipe",
    calories:    100,
    ingredients: ["corn", "apples", "other shit"],
    directions:  "mix stuff",
  },
  {
    title:       "Another recipe",
    calories:    2200,
    ingredients: ["notcorn", "bad apples"],
    directions:  "smash everything and shove it down ur throat",
  },
]

DB.open ENV["RECIPES_DB"] do |db|
  # Renders landing page.
  get "/recipes" do |env|
    page = "recipes"
    title = "Recipes"

    render {{ PAGE[:recipes] }}, {{ LAYOUT[:standard] }}
  end
end
