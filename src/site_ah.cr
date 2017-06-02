require "kemal"

_meta = render "./views/includes/meta.ecr"
_webapp = render "./views/includes/webapp.ecr"
_styles = render "./views/includes/styles.ecr"
_fonts = render "./views/includes/fonts.ecr"
_prism = render "./views/includes/prism.ecr"
_mathjax = render "./views/includes/js/mathjax.ecr"

get "/" do
  title = "Ayaz Hafiz"
  custom = render "./views/includes/_for-index.ecr"
  render "./views/pages/index.ecr", "./views/layouts/standard.ecr"
end

Kemal.run