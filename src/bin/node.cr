def node_install
  Process.run %{node-sass public/css/index.css -o public/}, shell: true
end