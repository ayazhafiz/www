require "./server/*"

# Describes methods for internal handling of the mail API
module HTTP::Mail
  extend self

  include HTTP::Mail::Server

  MIN_PASSWORD_LEN = 8

  # Create new user
  def signup(username user : String, password pass : String, database db)
    error = if Server::User.exists? user, database: db
              "User #{user} already exists"
            elsif pass.size < MIN_PASSWORD_LEN
              "Password length < #{MIN_PASSWORD_LEN}"
            end

    unless error
      Server::User.insert user, pass, database: db
      {
        successful: true,
      }
    else
      {
        successful: false,
        error:      error,
      }
    end
  end

  # Loads file mail for a user
  def load(for user : String, database db)
    files, links, senders, dates = {
      [] of String, [] of String, [] of String, [] of String,
    }
    db.query(
      "SELECT u_from, date, file, content_type, is_url, link \
       FROM files WHERE u_to=$1;", user) do |rs|
      rs.each do
        senders << rs.read String
        dates << rs.read String
        files << (file = rs.read String)
        ctype = rs.read String
        is_url = rs.read Bool
        link = rs.read String

        links << (is_url ? link : Server::Store.get_s3_file(file, ctype))
      end
    end
    return {files, links, senders, dates}
  end

  # Authorizes storing a file in the server
  def auth_upload(from sender : String?,
                  to recipient : String?,
                  file_name : String?,
                  file_type : String?,
                  database db)
    error = if !sender
              "Unauthorized access."
            elsif !recipient
              "No recipient pecified."
            elsif !file_name
              "No filename specified."
            elsif !file_type
              "File content type not specified."
            elsif sender === recipient
              "The sender may not be the recipient."
            elsif !Server::User.exists? username: recipient, database: db
              "Recepient does not exist."
            end

    if file_name && file_type && !error
      {
        successful: true,
        file_name:  file_name,
        upload_url: Server::Store.get_s3_put_url(file_name, file_type),
      }.to_json
    else
      {
        successful: false,
        error:      error,
      }.to_json
    end
  end

  # Saves upload to DB
  def save_upload(from sender : String,
                  to recipient : String,
                  file_name : String,
                  file_type : String,
                  database db)
    db.exec(
      "INSERT INTO files (file, link, u_from, u_to, date, content_type, is_url)\
       VALUES ($1, $2, $3, $4, $5, $6, $7)",
      file_name,
      "https://s3.amazonaws.com",
      sender,
      recipient,
      Time.now.to_utc.to_s,
      file_type,
      false)

    {
      successful: true,
    }
  end

  # Get file url
  def get_file(from sender : String,
               to recipient : String,
               file_name : String,
               date_created : String,
               database db)
    file, link, content_type, is_url = db.query_one(
      "SELECT file, link, content_type, is_url FROM files \
       WHERE u_from=$1 AND u_to=$2 AND file=$3 AND date=$4;",
      sender, recipient, file_name, date_created,
      as: {String, String, String, Bool})

    res = is_url ? link : Server::Store.get_s3_file file_name, content_type

    {
      successful: true,
      link:       res,
    }
  end
end
