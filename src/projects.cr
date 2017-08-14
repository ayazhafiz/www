require "kemal"

get "/atomas" { |env| env.redirect "https://ayazhafiz.github.io/atomas" }

get "/meethere" { |env| env.redirect "https://meethere.js.org" }
