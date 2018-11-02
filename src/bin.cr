require "kemal"

# Returns a script or its installer, depending on whether the correct password
# is provided.
get "/bin/:script" do |env|
  script = env.params.url["script"]
  password = env.params.query["password"]?

  if password
    if ENV["HAFIZ_#{script.upcase}_PASSWORD"] === password
      env.redirect ENV["HAFIZ_#{script}_URL"]
    else
      "echo 'Incorrect password!'"
    end
  else
    env.redirect "/scripts/#{script}"
  end
end
