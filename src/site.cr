require "./*"

# Sets secure headers for the entire web server
before_all do |env|
  env.response.headers.delete "X-Powered-By"
  env.response.headers["X-Content-Type-Options"] = "nosniff"
  env.response.headers["X-Frame-Options"] = "deny"
  env.response.headers["X-XSS-Protection"] = ["1", "mode=block"].join "; "
  if /curl/ =~ env.request.headers["user-agent"]?
    env.response.headers["_"] = "CURLed locks"
  end
end

Kemal.run unless Kemal.config.env === "test"
