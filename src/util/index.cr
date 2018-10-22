# Utilities for the landing page.
module Util::Index
  extend self

  # Array of selected projects.
  PROJECTS = [
    {
      title: "meetHere",
      link:  "https://github.com/ayazhafiz/meetHere",
      desc:  "Blazing-fast JavaScript library for handling locations on and " +
            "off maps.",
      emoji: "📍",
    },
    {
      title: "mail",
      link:  "https://ayazhafiz.com/mail/signup",
      desc:  "A secure, minimalist file-sharing app backed by S3.",
      emoji: "📨",
    },
    {
      title: "rcalc",
      link:  "https://github.com/ayazhafiz/rcalc",
      desc:  "Glorified calculator with a lexer, parser, and interpreter " +
            "written in Rust.",
      emoji: "🐘",
    },
    {
      title: "R-svd",
      link:  "https://ayaz.shinyapps.io/svd-image",
      desc:  "SVD-based image compression.",
      emoji: "🏇",
    },
    {
      title: "30 Days of Crystal",
      link:  "https://github.com/ayazhafiz/30-Days-of-Crystal",
      desc:  "30 exercises in the Crystal programming language.",
      emoji: "🌷",
    },
    {
      title: "rod",
      link:  "https://github.com/ayazhafiz/rod",
      desc:  "Another esoteric language.",
      emoji: "🎣",
    },
    {
      title: "calc-cli",
      link:  "https://github.com/ayazhafiz/calc-cli",
      desc:  "Calculus (and other stuff) in your terminal.",
      emoji: "🍉",
    },
  ]

  # Array of past + current experiences.
  WORK = [
    {
      title: "Vanderbilt Tong Lab",
      desc:  <<-HTML
Machine modeling of human
<a href="http://www.psy.vanderbilt.edu/tonglab/web/research.html">vision and object recognition</a>
patterns.
HTML
    },
    {
      title: "Principal Financial Group",
      desc:  <<-HTML
Front-end development and API design as a software engineering intern.
HTML
    },
    {
      title: "meetHere",
      desc:  <<-HTML
Full-stack development for an
<a href="https://genglobal.org/global-entrepreneurship-week-startup-open/gen-announces-top-10-startup-open-finalists">internationally-recognized</a>
startup.
HTML
    },
    {
      title: "UTD Berkner Lab",
      desc:  <<-HTML
Research intern exploring
<a href="http://asa.scitation.org/doi/abs/10.1121/1.4969616">viable applications</a>
of multi-walled carbon nanotubes.
HTML
    },
  ]

  # Array of personal links.
  LINKS = [
    {
      title: "blog",
      link:  "https://cc.ayazhafiz.com",
      emoji: "🥐",
    },
    {
      title: "github",
      link:  "https://github.com/ayazhafiz",
      emoji: "🖥",
    },
    {
      title: "email",
      link:  "mailto:ayaz.hafiz.1@gmail.com?subject=Hi!",
      emoji: "📧",
    },
    {
      title: "resume",
      link:  "https://ayazhafiz.com/self/resume",
      emoji: "💼",
    },
  ]

  # Languages and their shorthands for `about` section.
  LANGUAGES = {
    "C++"        => "cpp",
    "JavaScript" => "js",
    "TypeScript" => "ts",
    "Crystal"    => "cr",
    "Ruby"       => "rb",
    "Rust"       => "rs",
    "C"          => "c",
    "Java"       => "java",
    "Python"     => "py",
    "R"          => "r",
    "SQL"        => "sql",
  }
end
