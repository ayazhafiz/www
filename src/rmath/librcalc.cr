module HTTP::RMath
  @[Link(ldflags: "#{__DIR__}/../../target/release/librcalc.*")]
  lib Librcalc
    fun calc(program : UInt8*) : UInt8*
  end
end
