require "http/client"
require "json"
require "./librcalc"
require "../util/rmath"

# Descibes methods for internal handling of the Enoji API
module HTTP::RMath
  extend self

  include Util::RMath

  # Handles all emoji queries
  #
  # Sources handling different data types via type inference
  def evaluate(program : String? = nil,
               path = DEF_PATH)
    if program
      result = String.new Librcalc.calc(program)
      if result.to_f?
        {
          result: result,
        }
      else
        Error.api(
          error: Error.gen(result),
          path: path
        )
      end
    else
      Error.api(
        error: Error::NOT_EMBEDDED,
        path: path
      )
    end
  end
end
