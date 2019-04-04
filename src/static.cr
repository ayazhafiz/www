require "kemal"

serve_static({
  "gzip"        => true,
  "dir_listing" => false,
})
