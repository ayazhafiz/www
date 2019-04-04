require "kemal"
require "./util/http"

Util::HTTP::RD_302.each do |path, redirect|
  get(path) { |env| env.redirect redirect }
end
