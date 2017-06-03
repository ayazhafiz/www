def node_install
  Process.run %{node install && echo "yo" > public/yo.txt}, shell: true
end