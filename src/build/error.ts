import Typed from 'typed.js';
import { $ } from '../ts/util/el';
import * as Shell from '../ts/gfx/shell';
import { renderCrystalLogo } from '../ts/gfx/crystal';
import {
  shellEl,
  shellParentEl,
  cursorEl,
  crystalLogoEl,
  mobileSelectorEl,
  firstEl,
  secondEl,
  thirdEl,
  loadErrorEl,
  loadMessageEl,
  userPromptEl,
  cursorChar,
  pathString,
  openString,
} from '../ts/env/error';

import './error.scss';

/**
 * Default Typed type speed
 * @constant
 */
const TYPE_SPEED = 55;

/**
 * Verifies scroll position of shell
 * @function
 */
const verifyScrollPosition = (): void => {
  setTimeout((): void => {
    Shell.scrollIntoView(shellParentEl, cursorEl);
    verifyScrollPosition();
  }, TYPE_SPEED);
};

/**
 * Types the first command into the shell
 * @function
 */
const firstType = (): Typed => {
  verifyScrollPosition();
  const typed = new Typed(firstEl, {
    strings: openString,
    typeSpeed: TYPE_SPEED,
    backDelay: 0,
    backSpeed: 0,
    showCursor: true,
    cursorChar: cursorChar,
    smartBackspace: true,
    onStringTyped: (): void => {
      $(firstEl)
        .removeClass('unknown')
        .addClass('known');
    },
    onComplete: (): void => {
      $(cursorEl).remove();
      secondType();
    },
  });

  return typed;
};

/**
 * Types the second command into the shell
 * @function
 */
const secondType = (): Typed => {
  const typed = new Typed(secondEl, {
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
    },
  });

  return typed;
};

/**
 * Types the third command into the shell
 * @function
 */
const thirdType = (): Typed => {
  const typed = new Typed(thirdEl, {
    strings: openString,
    typeSpeed: TYPE_SPEED,
    backDelay: 0,
    backSpeed: 0,
    showCursor: true,
    cursorChar: cursorChar,
    smartBackspace: true,
    onStringTyped: (): void => {
      $(thirdEl)
        .removeClass('unknown')
        .addClass('known');
    },
    onComplete: (): void => {
      $(cursorEl).remove();
      shellType();
    },
  });

  return typed;
};

/**
 * Initiates typing in the shell
 * @function
 */
const shellType = (): Typed => {
  const typed = new Typed(shellEl, {
    strings: [''],
    typeSpeed: 80,
    showCursor: true,
    cursorChar: cursorChar,
    onComplete: (): void => {
      if ($(mobileSelectorEl)) {
        Shell.mobile(mobileSelectorEl);
      } else {
        Shell.init(shellEl);
      }
    },
  });

  return typed;
};

/**
 * Loads Crystal logo and Shell
 * @event
 */
for (const el of [loadErrorEl, loadMessageEl, userPromptEl]) {
  $(el).mask();
}
renderCrystalLogo(<HTMLCanvasElement>$(crystalLogoEl));
firstType();
