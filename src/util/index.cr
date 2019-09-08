require "./emoji"

# Utilities for the landing page.
module Util::Index
  extend self

  PAGE_TITLES = {
    "en" => "Ayaz Hafiz",
    "ru" => "Аяз Хафиз",
  }

  HEADER = {
    info: {
      "en" => <<-HTML,
              <p class="name-line margin-1"><span class="quasi name en"></span></p>
              <p>
                  Hi! I'm a CS/Chemistry undergrad at
                  <a href="https://vanderbilt.edu">Vanderbilt</a>.
                  Previously, I
                  <a class="tag pastel-purple" data-open="#work">worked</a>
                  on Angular and TypeScript at Google.
              </p>
              <p class="margin-1">
                  My interests are in building compilers, language tools, and systems software. I am
                  an open-source contributor, mostly to
                  <a href="https://github.com/angular/angular">Angular</a>.
              </p>
              <p>
                  The best way to reach me is via
                  <a href="mailto:ayaz.hafiz.1@gmail.com?subject=Hi!">email</a>.
                  More contact information can be found
                  <a class="tag pastel-yellow" data-open="#links">below</a>.
              </p>
              HTML
      "ru" => <<-HTML,
              <p>
                  Здрасьте! Я <span class="quasi name ru"></span>.
                  Я создаю вещи, пока в
                  <a href="https://vanderbilt.edu">Vanderbilt</a>,
                  где моя учеба концентрируются в <span class="quasi major ru"></span>
              </p>
              <p>
                  Я инженер-кода. Мой текущий фокус на
                  <b>языках и разработке компиляторов</b>.
              </p>
              HTML
    },
  }

  # Array of selected projects.
  PROJECTS = [
    {
      title: "Angular",
      link:  "https://github.com/angular/angular",
      desc:  {
        "en" => "Work on the Angular compiler and language analysis tools.",
        "ru" => "Работа над Angular компилятором и инструментами анализа языка.",
      },
      emoji:  "https://angular.io/assets/images/logos/angular/angular.svg",
      scale:  "scale-12",
      latest: true,
    },
    {
      title: "Kythe",
      link:  "https://github.com/kythe/kythe",
      desc:  {
        "en" => "Work on TypeScript source code indexer for the Kythe framework.",
        "ru" => "Работа над Angular компилятором и инструментами анализа языка.",
      },
      emoji: "https://avatars3.githubusercontent.com/u/44679334?s=200&v=4",
      scale: "scale-15",
    },
    {
      title: "sherpa_41",
      link:  "https://github.com/ayazhafiz/sherpa_41",
      desc:  {
        "en" => "Well-architectured, trivial browser engine.",
        "ru" => "Хорошо спроектированный, тривиальный браузер.",
      },
      emoji: "⛰",
    },
    {
      title: "position",
      link:  "https://github.com/ayazhafiz/position",
      desc:  {
        "en" => "Blazing-fast JavaScript library for handling locations on " +
                "and off maps.",
        "ru" => "Оптимизированная библиотека, написанная в JavaScript, для " +
                "обработки положений на и не на картах.",
      },
      emoji: "📍",
    },
    {
      title: "mail",
      link:  "https://ayazhafiz.com/mail/signup",
      desc:  {
        "en" => "A secure, minimalist file-sharing app backed by AWS S3.",
        "ru" => "Безопасное минималистское приложение для обмена файлами, " +
                "подержано по AWS S3.",
      },
      emoji: "📨",
    },
    {
      title: "rcalc",
      link:  "https://github.com/ayazhafiz/rcalc",
      desc:  {
        "en" => "Glorified calculator with a lexer, parser, and " +
                "interpreter written in Rust.",
        "ru" => "Простой калькулятор с необычным лексером, парсером и " +
                "интерпретатором написанным в Rust.",
      },
      emoji: "🐘",
    },
    {
      title: "R-svd",
      link:  "https://ayaz.shinyapps.io/svd-image",
      desc:  {
        "en" => "SVD-based image compression.",
        "ru" => "Компрессия изображений из способа SVD.",
      },
      emoji: "🏇",
    },
  ]

  # Array of past + current experiences.
  WORK = [
    {
      title: "Google",
      desc:  {
        "en" => <<-HTML,
                <a href="https://cc.ayazhafiz.com/articles/19/what-i-did-this-summer">Development of source code indexers</a>
                as a SWE intern on the Angular team.
                HTML
        "ru" => <<-HTML,
                Разработал индексаторы кода в качестве программист-интерн под команде Angular.
                HTML
      },
      first_latest: true,
    },
    {
      title: "Principal Financial Group",
      desc:  {
        "en" => <<-HTML,
                Front-end development and API design as a software engineering intern.
                HTML
        "ru" => <<-HTML,
                Разработка интерфейса и дизайн API в качестве программист-интерн.
                HTML
      },
      first_previous: true,
    },
    {
      title: "Vanderbilt Tong Lab",
      desc:  {
        "en" => <<-HTML,
                Machine modeling of human
                <a href="http://www.psy.vanderbilt.edu/tonglab/web/research.html">vision and object recognition</a>
                patterns.
                HTML
        "ru" => <<-HTML,
                Компьютерное моделирование формы человеческого
                <a href="http://www.psy.vanderbilt.edu/tonglab/web/research.html">зрения и распознавания объектов</a>.
                HTML
      },
    },
    {
      title: "meetHere",
      desc:  {
        "en" => <<-HTML,
                Full-stack development for an
                <a href="https://genglobal.org/global-entrepreneurship-week-startup-open/gen-announces-top-10-startup-open-finalists">internationally-recognized</a>
                startup.
                HTML
        "ru" => <<-HTML,
                Разработчик full-stack для
                <a href="https://genglobal.org/global-entrepreneurship-week-startup-open/gen-announces-top-10-startup-open-finalists">международно признанным</a>
                стартап.
                HTML
      },
    },
    {
      title: "UTD Berkner Lab",
      desc:  {
        "en" => <<-HTML,
                Research intern exploring
                <a href="http://asa.scitation.org/doi/abs/10.1121/1.4969616">viable applications</a>
                of multi-walled carbon nanotubes.
                HTML
        "ru" => <<-HTML,
                Исследовательский интерн изучая
                <a href="http://asa.scitation.org/doi/abs/10.1121/1.4969616">успешный применения</a>
                многостенных углеродных нанотрубок (MWCNTs).
                HTML
      },
    },
  ]

  # Info for the `About` section
  ABOUT = {
    languages: {
      {
        name:        "C++",
        short:       "cpp",
        proficiency: 1,
      },
      {
        name:        "TypeScript",
        short:       "ts",
        proficiency: 1,
      },
      {
        name:        "JavaScript",
        short:       "js",
        proficiency: 1,
      },
      {
        name:        "Rust",
        short:       "rs",
        proficiency: 1,
      },
      {
        name:        "C",
        short:       "c",
        proficiency: 0.9,
      },
      {
        name:        "Crystal",
        short:       "cr",
        proficiency: 0.8,
      },
      {
        name:        "Ruby",
        short:       "rb",
        proficiency: 0.8,
      },
      {
        name:        "Python",
        short:       "py",
        proficiency: 0.6,
      },
      {
        name:        "Java",
        short:       "java",
        proficiency: 0.5,
      },
      {
        name:        "R",
        short:       "r",
        proficiency: 0.5,
      },
      {
        name:        "SQL",
        short:       "sql",
        proficiency: 0.4,
      },
    },
    experiences: {
      "en" => <<-HTML,
              The languages above are ordered by <span class="quasi langs en"></span>.
              Besides the CS stuff, I am well-versed in
              <span class="chem">#analytical</span> and
              <span class="chem">#organic</span> chemistry.
              HTML
      "ru" => <<-HTML,
              Языки выше упорядочены по <span class="quasi langs en"></span>.
              Кроме информатике, я также хорошо разбираюсь в
              <span class="chem">#аналитической</span> и
              <span class="chem">#органической</span> химии.
              HTML
    },
    hobbies: {
      "en" => <<-HTML,
              Nonprofessionally, I am an avid skier :ski_emoji:,
              burrito eater :burrito_emoji:,
              4/4 beat maker :controller_emoji:,
              and bad-dance-moves enthusiast :dancer_emoji:.
              HTML
      "ru" => <<-HTML
              Непрофессионально, я увлеченный лыжник :ski_emoji:,
              едок буррито :burrito_emoji:,
              производитель бить 4/4 :controller_emoji:,
              и энтузиаст плохих танцыx :dancer_emoji:.
              HTML
    },
  }

  def generate_about_hobbies(lang, apple)
    ABOUT[:hobbies][lang]
      .sub(" :ski_emoji:", Util::Emoji.render("⛷", wrap_in: {" ", ""}, native_display: apple))
      .sub(" :burrito_emoji:", Util::Emoji.render("🌯", wrap_in: {" ", ""}, native_display: apple))
      .sub(" :controller_emoji:", Util::Emoji.render("🎛", wrap_in: {" ", ""}, native_display: apple))
      .sub(" :dancer_emoji:", Util::Emoji.render("🕺", wrap_in: {" ", ""}, native_display: apple))
  end

  # Array of personal links.
  LINKS = [
    {
      title: {
        "en" => "blog",
        "ru" => "блог",
      },
      link:  "https://cc.ayazhafiz.com",
      emoji: "📮",
    },
    {
      title: {
        "en" => "email",
        "ru" => "емейл",
      },
      link:  "mailto:ayaz.hafiz.1@gmail.com?subject=Hi!",
      emoji: "📧",
    },
    {
      title: {
        "en" => "GitHub",
        "ru" => "GitHub",
      },
      link:  "https://github.com/ayazhafiz",
      emoji: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    },
    {
      title: {
        "en" => "LinkedIn",
        "ru" => "LinkedIn",
      },
      link:  "https://linkedin.com/in/ayazhafiz",
      emoji: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    },
    {
      title: {
        "en" => "resume",
        "ru" => "резюме",
      },
      link:  "https://ayazhafiz.com/self/resume",
      emoji: "💼",
    },
  ]

  def generate_tail(lang, mobile)
    TAIL_MSG[lang].sub(":maybe_statement:", mobile ? "<br/><br/>Sorry if the hover's been weird." : "")
  end

  TAIL_MSG = {
    "en" => <<-HTML,
            This website hosts public APIs documented in
            <a href="https://github.com/ayazhafiz/crystal-ah">the source</a>.
            An opinionated workspace configuration is
            <a href="https://github.com/ayazhafiz/hmcd"><code>hmcd</code></a>.
            :maybe_statement:
            HTML
    "ru" => <<-HTML,
            Если вы хотите просматривать или редактировать «секретные» API этого веб-сайта,
            <a href="https://github.com/ayazhafiz/crystal-ah">проверьте репозиторий</a>.
            :maybe_statement:
            HTML
  }
end
