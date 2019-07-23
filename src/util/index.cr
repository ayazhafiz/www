require "./emoji"

# Utilities for the landing page.
module Util::Index
  extend self

  PAGE_TITLES = {
    "en" => "Ayaz Hafiz",
    "ru" => "Аяз Хафиз",
  }

  HEADER = {
    intro: {
      "en" => <<-HTML,
              <p> Hey! I'm <span class="quasi name en"></span>.
                  I am a CS/Chemistry undergrad at Vanderbilt.
                  This summer I am working at
                  <a href="https://cloud.google.com">Google</a>.
              </p>
              HTML
      "ru" => <<-HTML,
              <p> Здрасьте! Я <span class="quasi name ru"></span>.
                  Я создаю вещи, пока в
                  <a href="https://vanderbilt.edu">Vanderbilt</a>,
                  где моя учеба концентрируются в <span class="quasi major ru"></span>
              </p>
              HTML
    },
    future: {
      "en" => <<-HTML,
              <p> I study and engineer codes. My current focus is on
              <b>language design</b> and <b>graphics rendering</b>.
              </p>
              HTML
      # <<-HTML,
      # <p> My social and developmental interests are in
      #     diversification and
      #     <a href="https://en.wikipedia.org/wiki/Ownership_(psychology)">ownership</a>.
      # </p>
      # HTML
      "ru" => <<-HTML,
              <p> Этим летом я буду работать в
                <a href="https://cloud.google.com">Google</a>
                на Angular и их платформе cloud.
              </p>
              HTML
    },
    learn_more: {
      "en" => <<-HTML,
              <p> Below you can
                  <span class="quasi expand en"></span> my experiences
                  (and see what I'm about).
              </p>
              HTML
      "ru" => <<-HTML,
              <p> Работа сильнее слов. По этой причине, ниже вы можете
                  <span class="quasi expand ru"></span> вещей с чем я занимаюсь
                  (и увидете кто я такой).
              </p>
              HTML
    },
    eccentric_me: {
      "en" => <<-HTML,
              <p> To get started,
                  <a href="/?ui">here's a feel for my style</a>.
              </p>
              HTML
      "ru" => <<-HTML,
              <p> Для начала,
                  <a href="/?ui">вот мой стиль</a>.
              </p>
              HTML
    },
  }

  # Array of selected projects.
  PROJECTS = [
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
      title: "sherpa_41",
      link:  "https://github.com/ayazhafiz/sherpa_41",
      desc:  {
        "en" => "Well-architectured, trivial browser engine.",
        "ru" => "Хорошо спроектированный, тривиальный браузер.",
      },
      emoji:  "⛰",
      latest: true,
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
    {
      title: "30 Days of Crystal",
      link:  "https://github.com/ayazhafiz/30-Days-of-Crystal",
      desc:  {
        "en" => "30 exercises in the Crystal programming language.",
        "ru" => "30 упражнений на языке программирования «Crystal».",
      },
      emoji: "🌷",
    },
    {
      title: "rod",
      link:  "https://github.com/ayazhafiz/rod",
      desc:  {
        "en" => "Another esoteric language.",
        "ru" => "Еще один эзотерический язык.",
      },
      emoji: "🎣",
    },
    {
      title: "calc-cli",
      link:  "https://github.com/ayazhafiz/calc-cli",
      desc:  {
        "en" => "Calculus (and other stuff) in your terminal.",
        "ru" => "Матанализ (и прочее) в вашем терминале.",
      },
      emoji: "🍉",
    },
  ]

  # Array of past + current experiences.
  WORK = [
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
        name:        "Rust",
        short:       "rs",
        proficiency: 1,
      },
      {
        name:        "JavaScript",
        short:       "js",
        proficiency: 1,
      },
      {
        name:        "TypeScript",
        short:       "ts",
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
      .sub(":ski_emoji:", Util::Emoji.render("⛷", native_display: apple))
      .sub(":burrito_emoji:", Util::Emoji.render("🌯", native_display: apple))
      .sub(":controller_emoji:", Util::Emoji.render("🎛", native_display: apple))
      .sub(":dancer_emoji:", Util::Emoji.render("🕺", native_display: apple))
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
        "en" => "github",
        "ru" => "github",
      },
      link:  "https://github.com/ayazhafiz",
      emoji: "🖥",
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
