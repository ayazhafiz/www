cmd = %{node t.js}
io = IO::Memory.new
Process.run(cmd, shell: true, output: io)
puts io.to_s