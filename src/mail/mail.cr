# Describes methods for internal handling of the mail API
module HTTP::Mail
  extend self

  # Loads file mail for a user
  def load(for user : String, database db)
    files, links, senders, dates = {
      [] of String, [] of String, [] of String, [] of String,
    }
    db.query("SELECT file, link, u_from, date FROM files WHERE u_to=$1;",
      user) do |rs|
      rs.each do
        files << rs.read String
        links << rs.read String
        senders << rs.read String
        dates << rs.read String
      end
    end
    return {files, links, senders, dates}
  end

  # Sends a file to S3 storage
  def send(file : Kemal::FileUpload,
           filename : String?,
           from user : String?,
           to recipient : String,
           key : String,
           database db)
    if !user
      {
        successful: false,
        error:      "Unauthorized access.",
      }
    elsif !filename.is_a? String
      {
        successful: false,
        error:      "No filename specified.",
      }
    elsif recipient === user
      {
        successful: false,
        error:      "self send",
      }
    elsif !HTTP::Mail::User.valid?(
            username: user,
            password: key,
            database: db)
      {
        successful: false,
        error:      "Invalid credentials sent.",
      }
    elsif !HTTP::Mail::User.exists? username: recipient, database: db
      {
        successful: false,
        error:      "Recepient does not exist.",
      }
    else
      file_path = File.join [Kemal.config.public_folder, "uploads/", filename]
      File.open(file_path, "w") do |f|
        IO.copy(file.tmpfile, f)
      end
      {
        file:       filename,
        successful: true,
      }
    end
  end
end
