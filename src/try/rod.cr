require "rod"

def try_rod(str)
  if str.includes? ':'
    {
      error: "Colons (`:`) are not currently supported in online mode.",
    }
  else
    res = Rod.new.rod str
    {
      success: res[0],
    }
  end
end
