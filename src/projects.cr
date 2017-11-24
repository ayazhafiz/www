require "kemal"
require "./util/http_util"

HTTP::Util::RD_302.each do |path, redirect|
  get(path) { |env| env.redirect redirect }
end
