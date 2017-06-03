def node_install
  Process.run %{node install}, shell: true, output: true
end