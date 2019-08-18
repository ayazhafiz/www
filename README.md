[![Build Status](https://travis-ci.org/ayazhafiz/www.svg?branch=master)](https://travis-ci.org/ayazhafiz/www)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/87cb11d1771047d59063940b71ea3e3d)](https://www.codacy.com/app/ayazhafiz/crystal-ah?utm_source=github.com&utm_medium=referral&utm_content=ayazhafiz/crystal-ah&utm_campaign=badger)

My public server, written mostly in [Crystal](https://crystal-lang.org),
[Rust](https://rust-lang.org), and [TypeScript](https://www.typescriptlang.org).

### Features

`www` is an application server, hosting much more than just my informational page. Most
of its features are listed below, under the top-level root `hafiz`.

- [ ] [hafiz](https://ayazhafiz.com) - top level root.
  - [x] [/atomas](https://ayazhafiz.github.io/atomas) - a web clone of
        [atomas](https://en.wikipedia.org/wiki/Atomas).
  - [x] [/blog](https://cc.ayazhafiz.com) - like a blog.
  - [x] /bin - dynamically served scripts.
    - Provides marginally secure hosting for scripts that you want to share, but
      not necessarily with everyone. Free to use; just file an issue for what
      you need.
  - [x] [/bios](https://ayazhafiz.com/bios) - bios I like.
  - [x] [/cc](https://cc.ayazhafiz.com) - like a blog.
  - [x] [/mail](https://ayazhafiz.com/mail) - a secure, lightweight mail client.
    - [x] [/signup](https://ayazhafiz.com/mail/signup)
  - [x] [/movie-emoji](https://ayazhafiz.github.io/movie-emoji) - a game.
  - [x] [/notes](https://ayazhafiz.com/notes) - class notes of varying
        completenness.
  - [x] [/position](https://ayazhafiz.github.io/position) - a spatial position library.
  - [x] [/recipes](https://ayazhafiz.com/recipes) - recipes. File an issue to
        submit your own.
  - [ ] /try - text editors and online compilers.
    - [x] [/anoop](https://ayazhafiz.com/try/anoop) - the `anoop` esoteric
          language.
    - [x] [/rod](https://ayazhafiz.com/try/rod) - the `rod` esoteric language.
    - [ ] /xela - the `xela` programming language.
  - [x] [/vector](https://ayazhafiz.com/vector) - get information about vectors.

There's a lot of APIs here, but I do not currently have the
bandwidth to document them. Please file an issue if it benefits you
for me to do that.

### Persistence

The repo is reset to an initial commit after each 100 commits, or after major
feature (`X.0.0`) introduction. This is done because big numbers scare me or
because I am not an image of my past, whichever sounds better.
There have been **2** resets so far.
