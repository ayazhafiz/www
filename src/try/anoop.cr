module Anoop
  extend self

  MUSTACHE = <<-MUSTACHE
                         oooooo          ooooo
     ooooo             ooooooooooo    ooooooooooo             ooooo
    oooo             oooooooooooooo ooooooooooooooo            ooooo
   oooo            ooooooooooooooooooooooooooooooooo            oooo
   oooo           oooooooooooooooooooooooooooooooooooo           oooo
  oooo          ooooooooooooooooooooooooooooooooooooooo          oooo
  ooooo        oooooooooooooooooooooooooooooooooooooooooo        oooo
  ooooo      ooooooooooooooooooooooooooooooooooooooooooooo      ooooo
  ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
  ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
   ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
   ooooooooooooooooooooooooooooooo   ooooooooooooooooooooooooooooooo
    ooooooooooooooooooooooooooooo     ooooooooooooooooooooooooooooo
     oooooooooooooooooooooooooo         oooooooooooooooooooooooooo
      ooooooooooooooooooooooo             ooooooooooooooooooooooo
        oooooooooooooooooo                   oooooooooooooooooo
          ooooooooooo                           ooooooooooo
  MUSTACHE
  MULTIPLIER = 1.5
  LETTER     = "o"

  def name(name : String)
    name = name.strip
    return error("Anoop is one name!") if /\s/ =~ name
    return error("Capitalize the FUCKING name!") if name[0] === 'a'
    if name.split("") | "Anoop".split("") != "Anop".split("")
      return error("Bitch, his name is spelled with `A`, `n`, `o`, and `p`.")
    end
    if count([name.split ""], LETTER) < 2
      return error("Two `o`s in the name. Eat my ass.")
    end
    anoop(name)
  end

  private def anoop(name : String)
    os = MUSTACHE.split("\n").map { |line| line.split "" }
    amt = count(os, LETTER)

    rate = MULTIPLIER / count([name.split ""], LETTER)
    needed = amt - (amt * rate).round

    while count(os, LETTER) > needed
      i = rand(os.size)
      j = rand(os[i].size)
      os[i][j] = " "
    end

    os.map { |line| line.join "" }.join("\n")
  end

  private def count(arr : Array(Array(String)), char : String)
    arr.reduce(0) { |acc, row|
      acc + (row.reduce(0) { |sum, ch| ch === char ? sum + 1 : sum + 0 })
    }
  end

  private def error(message : String)
    message
  end
end

def try_anoop(str)
  res = Anoop.name str
  {
    success: res,
  }
end
