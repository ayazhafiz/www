require "crypto/bcrypt/password"
require "uri"

module HTTP::Mail
  extend self

  def valid_user?(username user : String,
                  password pass : String?,
                  database db) : Bool
    return false if !pass

    begin
      valid_key = Crypto::Bcrypt::Password.new(db.query_one(
        "SELECT key FROM users WHERE username=$1;",
        user,
        as: String))
      return valid_key == URI.unescape pass
    rescue
      return false
    end
  end

  def get_mail(for user : String, database db)
    files = [] of String
    links = [] of String
    senders = [] of String
    dates = [] of String
    db.query "SELECT file, link, u_from, date FROM files WHERE u_to=$1;", user do |rs|
      rs.each do
        files << rs.read String
        links << rs.read String
        senders << rs.read String
        dates << rs.read String
      end
    end
    return {files, links, senders, dates}
  end
end
