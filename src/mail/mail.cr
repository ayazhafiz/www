require "crypto/bcrypt/password"
require "uri"

module HTTP::Mail
  extend self

  def valid_user?(uname : String, pass : String?, db) : Bool
    return false if !pass

    begin
      valid_key = Crypto::Bcrypt::Password.new db.query_one "SELECT key FROM users WHERE username=$1", uname, as: String
      return valid_key == URI.unescape pass
    rescue
      return false
    end
  end
end
