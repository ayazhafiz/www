require "crypto/bcrypt/password"
require "uri"

# Describes methods for internal handling of the mail API's users
module HTTP::Mail::Server::User
  extend self

  # Verifies whether a user exists
  def exists?(username user : String, database db) : Bool
    rs = db.query "SELECT username FROM users WHERE username=$1", user
    result = rs.move_next
    rs.close
    result
  end

  # Verifies whether a user's credentials are valid. Uses BCrypt encryption.
  def valid?(username user : String,
             password pass : String?,
             database db) : Bool
    return false if !pass

    begin
      valid_key = Crypto::Bcrypt::Password.new(db.query_one(
        "SELECT key FROM users WHERE username=$1;",
        user,
        as: String))
      return valid_key === URI.unescape pass
    rescue
      return false
    end
  end
end
