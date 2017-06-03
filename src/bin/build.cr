require "./echo.cr"
require "./node.cr"

module Build

  extend self

  def build
    echo
    node_install
  end
end