require "kemal"

static_headers do |response, filepath, filestat|
  if filepath =~ /\.asc$/
    response.headers.add("Content-Type", "text/plain")
  end
end

serve_static({
  "gzip"        => true,
  "dir_listing" => false,
})
