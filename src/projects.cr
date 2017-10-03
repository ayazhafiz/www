require "kemal"

RD = {
  "/atomas"   => "https://ayazhafiz.github.io/atomas",
  "/blog"     => "https://cc.ayazhafiz.com",
  "/cc"       => "https://cc.ayazhafiz.com",
  "/meethere" => "https://meethere.js.org",
}

RD.each do |path, redirect|
  get(path) { |env| env.redirect redirect }
end
