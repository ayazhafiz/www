import * as Typed from 'typed.js';
import { $ } from '../ts/page/el';
import * as Shell from '../ts/gfx/shell';
import { make as crystalModel } from '../ts/gfx/crystal';
import {
  shellEl,
  shellParentEl,
  cursorEl,
  mobileSelectorEl,
  firstEl,
  secondEl,
  thirdEl,
  loadErrorEl,
  loadMessageEl,
  userPromptEl,
  cursorChar,
  pathString,
  openString
} from '../ts/env/error_env';

import './error.scss';

const TYPE_SPEED = 55;

const verifyScrollPosition = (): void => {
  setTimeout((): void => {
    Shell.scrollIntoView(shellParentEl, cursorEl);
    verifyScrollPosition();
  }, TYPE_SPEED);
};

const firstType = (): void => {
  verifyScrollPosition();
  new Typed(firstEl, {
    strings: openString,
    typeSpeed: TYPE_SPEED,
    backDelay: 0,
    backSpeed: 0,
    showCursor: true,
    cursorChar: cursorChar,
    smartBackspace: true,
    onStringTyped: (): void => {
      $(firstEl).removeClass('unknown').addClass('known');
    },
    onComplete: (): void => {
      $(cursorEl).remove();
      secondType();
    }
  });
};

const secondType = (): void => {
  new Typed(secondEl, {
    strings: pathString,
    typeSpeed: TYPE_SPEED,
    showCursor: true,
    cursorChar: cursorChar,
    onComplete: (): void => {
      $(cursorEl).remove();
      $(loadErrorEl).unmask();
      $(loadMessageEl).unmask();

      setTimeout((): void => {
        $(userPromptEl).unmask();
        thirdType();
      }, 200);
    }
  });
};

const thirdType = (): void => {
  new Typed(thirdEl, {
    strings: openString,
    typeSpeed: TYPE_SPEED,
    backDelay: 0,
    backSpeed: 0,
    showCursor: true,
    cursorChar: cursorChar,
    smartBackspace: true,
    onStringTyped: (): void => {
      $(thirdEl).removeClass('unknown').addClass('known');
    },
    onComplete: (): void => {
      $(cursorEl).remove();
      shellType();
    }
  });
};

const shellType = (): void => {
  new Typed(shellEl, {
    strings: [''],
    typedSpeed: 80,
    showCursor: true,
    cursorChar: cursorChar,
    onComplete: (): void => {
      if ($(mobileSelectorEl)) {
        Shell.mobile(mobileSelectorEl);
      } else {
        Shell.init(shellEl);
      }
    }
  });
};

document.addEventListener(
  'DOMContentLoaded',
  (): void => {
    for (let el of [loadErrorEl, loadMessageEl, userPromptEl]) {
      $(el).mask();
    }
    crystalModel();
    firstType();
  },
  false
);
