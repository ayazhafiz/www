require "kemal"

RD_302 = {
  "/atomas"      => "https://ayazhafiz.github.io/atomas",
  "/blog"        => "https://cc.ayazhafiz.com",
  "/cc"          => "https://cc.ayazhafiz.com",
  "/meethere"    => "https://meethere.js.org",
  "/movie-emoji" => "https://ayazhafiz.github.io/movie-emoji",
}

RD_302.each do |path, redirect|
  get(path) { |env| env.redirect redirect }
end
