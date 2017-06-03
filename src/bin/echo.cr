def echo
  Process.run %{echo "hello world!" > public/hello.txt}, shell: true
end