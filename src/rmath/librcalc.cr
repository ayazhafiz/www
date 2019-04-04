module HTTP::RMath
  @[Link(ldflags: "`find \"#{__DIR__}/../../target/release/\" -type f -name \\*.so -o -name \\*.dylib -maxdepth 1`")]
  lib Librcalc
    fun calc(program : UInt8*) : UInt8*
  end
end
