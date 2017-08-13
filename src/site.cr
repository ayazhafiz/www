require "./*"

before_all do |env|
  env.response.headers.delete "X-Powered-By"
  if /curl/ =~ env.request.headers["user-agent"]?
    env.response.headers["_"] = "CURLed locks"
  end
end

Kemal.run unless Kemal.config.env === "test"
