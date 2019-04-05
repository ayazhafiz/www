require "db"
require "pg"
require "kemal"

BIN_TABLE = "allowances"
DB.open ENV["BIN_DB"] do |db|
  # Returns a script or its installer, depending on whether the correct password
  # is provided.
  get "/bin/:script" do |env|
    script = env.params.url["script"]
    password = env.params.query["password"]?
    name = env.params.query["for"]?
    os = env.params.query["os"]?

    if !password && !name
      next env.redirect "/scripts/#{script}"
    elsif !os || !["mac", "linux"].includes? os
      next "echo 'Invalid OS!'"
    elsif name && db.query_one("SELECT EXISTS(SELECT 1 FROM #{BIN_TABLE} " +
                               "WHERE script=$1 AND name=$2)", script, name, as: Bool)
      # remove one-time ID
      db.exec("DELETE FROM #{BIN_TABLE} WHERE script=$1 AND name=$2", script, name)
      env.redirect ENV["HAFIZ_#{script.upcase}_#{os.upcase}_URL"]
    elsif password && ENV["HAFIZ_#{script.upcase}_PASSWORD"] === password
      env.redirect ENV["HAFIZ_#{script.upcase}_#{os.upcase}_URL"]
    else
      next "echo 'Invalid Access!'"
    end
  end
end
