require "is_mobile"
require "../util/http"
require "../util/index"

include Util::HTTP
include Util::Index

module HTTP::Views
  extend self

  # Renders landing page.
  def render_home(env, render_lang)
    ui? = env.request.query === "ui"
    page = ui? ? "index_ui" : "index"

    mobile = is_mobile? env.request.headers["user-agent"]?
    apple? = /iPad|iPhone|iPod|Mac OS X/ =~ env.request.headers["user-agent"]?

    title = PAGE_TITLES[render_lang]
    env.response.headers["Content-Language"] = render_lang

    if ui?
      render {{ PAGE[:index_ui] }}, {{ LAYOUT[:standard] }}
    else
      render {{ PAGE[:index] }}, {{ LAYOUT[:standard] }}
    end
  end
end
