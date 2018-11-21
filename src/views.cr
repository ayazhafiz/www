require "kemal"
require "./views/*"

# Determine landing page language by routes.
# Landing page is English by default.
get "/:lang" do |env|
  case env.params.url["lang"]
  when "en"; env.redirect "/"
  when "ru"; HTTP::Views.render_home env, "ru"
  else       env.redirect "/" # language not localized

  end
end

get "/" do |env|
  HTTP::Views.render_home env, "en"
end
