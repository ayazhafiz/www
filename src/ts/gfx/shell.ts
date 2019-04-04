import Typed from 'typed.js';
import '../util/array';
import { $ } from '../util/el';
import {
  shellEl,
  shellParentEl,
  cursorEl,
  mobileSelectorEl,
  shadowSlashClass,
  cursorChar,
  knownPaths,
  knownSubPaths,
  knownFullPaths,
  matchClass,
  animClass,
} from '../env/error';

/**
 * Acceptable keystrokes within a shell
 * @constant
 */
const KEY = {
  backspace: 8,
  tab: 9,
  enter: 13,
  space: 32,
  delete: 46,
  digits: [48, 57].range(),
  letters: [65, 90].range(),
  extraneous: [186, 192].range().concat([219, 222].range()),
};
const KEY_ARRAY = Object.values(KEY).flat();

/**
 * Required keystroke timeout
 * @constant
 */
const MIN_PAUSE = 500;
const SLASH = '/';

/**
 * Stores the State of the KeystrokeBuffer
 * @class
 */
class State {
  /**
   * Stores the current buffer
   * @static
   */
  private static privBuffer: string = '';

  static get buffer() {
    return State.privBuffer;
  }

  /**
   * Stores the current subPath
   * @static
   */
  private static privSubPath: string = '';

  static get subPath() {
    return State.privSubPath;
  }

  /**
   * Stores the current suggestions, and which suggestion is currently shown
   * @static
   */
  private static sug: { paths: string[]; index: number } = {
    paths: knownPaths,
    index: 0,
  };

  /**
   * Stores current paths and subpaths for mobile view
   * @static
   */
  public static mobile: {
    pathEls: HTMLDivElement[];
    subPaths: string[];
  } = {
    pathEls: [],
    subPaths: [''],
  };

  /**
   * Stores whether a key was pressed, the time it was pressed, and its last
   * keycode value
   * @static
   */
  public static key: {
    pressed: boolean;
    timePressed: number;
    lastKey: number;
  } = {
    pressed: null,
    timePressed: 0,
    lastKey: KEY.tab,
  };

  /**
   * Stores environment elements of the KeystrokeBuffer
   * @static @constant
   */
  static get el(): { cursor: string; shell: string } {
    return {
      cursor: cursorEl,
      shell: shellEl,
    };
  }

  /**
   * Returns the last index of suggested paths
   * @private @static @function
   */
  private static get lastIndex(): number {
    return State.sug.paths.length - 1;
  }

  /**
   * Resets the KeystrokeBuffer index
   * @private @static @function
   */
  private static resetIndex(): void {
    this.sug.index = 0;
  }

  /**
   * Resets the KeystrokeBuffer index
   * @private @static @function
   */
  public static updateNextPath(goBack: boolean): number {
    this.sug.index += goBack ? -1 : +1;
    if (this.sug.index >= this.sug.paths.length) {
      this.resetIndex();
    } else if (this.sug.index < 0) {
      this.sug.index = State.lastIndex;
    }
    return this.sug.index;
  }

  /**
   * Gets the next suggested path of the KeystrokeBuffer
   * @static @function
   */
  public static getNextPath(goBack: boolean): string {
    let idx;
    if (State.key.timePressed === 0) {
      idx = this.sug.index;
      if (goBack) {
        --idx;
        if (idx < 0) {
          idx = State.lastIndex;
        }
      }
    } else {
      idx = State.updateNextPath(goBack);
    }
    const path = this.sug.paths[idx];

    return path || '';
  }

  /**
   * Gets suggested paths of the KeystrokeBuffer
   * @static @function
   */
  static set pathsLike(query: string) {
    this.sug.paths = knownPaths.filter((pt) => pt.startsWith(query));
    const idx = query.lastIndexOf('/');
    const subPath = idx === 0 ? query : query.substring(0, idx);
    if (knownSubPaths[subPath]) {
      query = idx === 0 ? '' : query.substring(idx);
      this.sug.paths = knownSubPaths[subPath].filter((pt) =>
        pt.startsWith(query),
      );
    }
    this.privSubPath = knownSubPaths[subPath] ? subPath : '';

    State.resetIndex();
  }

  /**
   * Updates the buffer to its closest path suggestion
   * @function
   */
  private static tabBuffer(el: string, shiftBack: boolean): void {
    const sanitizedPath = sanitize(el);
    const leadingSlash = hasLeadingSlash(getPath(el));
    if (State.key.lastKey !== KEY.tab) {
      State.pathsLike = sanitizedPath;
    }
    const oldBuffer = State.buffer;
    const newBuffer = `${State.subPath}${State.getNextPath(shiftBack)}`;
    if (newBuffer) {
      this.privBuffer =
        leadingSlash || oldBuffer === '' ? newBuffer : newBuffer.slice(1);
    }
  }

  /**
   * Updates the KeystrokeBuffer based on a user's keystroke
   * @static @function
   */
  public static updateBuffer(evt: KeyboardEvent, el: string): void {
    const code = evt.keyCode || evt.which;
    const sanitizedPath = sanitize(el);

    if (
      (evt.ctrlKey || evt.metaKey || evt.altKey) &&
      !(code === KEY.backspace || code === KEY.delete)
    ) {
      // do nothing
    } else if (code === KEY.enter) {
      // if enter, redirect user to new path
      redirect(encodeURI(sanitizedPath));
    } else if (code === KEY.tab) {
      // if tab, attempt to match-to-path buffer
      this.tabBuffer(el, evt.shiftKey);
    } else if (code === KEY.space) {
      // if space, add to buffer
      this.privBuffer += ' ';
    } else if (code === KEY.backspace || code === KEY.delete) {
      // if backspace/delete, remove character (whole line, if modifier is active)
      this.privBuffer = this.privBuffer.slice(0, -1);
      if (evt.ctrlKey || evt.metaKey) {
        this.privBuffer = '';
      }
    } else if (
      [...KEY.digits, ...KEY.letters, ...KEY.extraneous].includes(code)
    ) {
      // if operable character, add to buffer
      let st = evt.key || String.fromCharCode(code);
      if (!evt.shiftKey) {
        st = st.toLowerCase();
      }
      this.privBuffer += st;
    }
    if (KEY_ARRAY.includes(code)) {
      this.key.lastKey = code;
    }
  }
}

/**
 * Returns whether a string has a leading slash
 * @function
 */
const hasLeadingSlash = (str: string): boolean => str.slice(0, 1) === SLASH;

/**
 * Returns the text path of an element and if it has a leading slash
 * @function
 */
const getPath = (el: string): string => $(el).innerText;

/**
 * Sanitizes the path of an element by forcing leading slash
 * @function
 */
const sanitize = (el: string): string => {
  const path = getPath(el);

  return hasLeadingSlash(path) ? path : `${SLASH}${path}`;
};

/**
 * Updates an element with the KeystrokeBuffer and updates the State's path
 * suggestions to match the Buffer
 * @function
 */
const update = (el: string): void => {
  $(el).innerText = State.buffer;

  const sanitizedPath = sanitize(el);
  checkForMatch(el, sanitizedPath);
  checkForShadow(el, sanitizedPath);
};

/**
 * Checks for match between the KeystrokeBuffer and current known paths
 * @function
 */
const checkForMatch = (el: string, path: string): void => {
  if (knownFullPaths.some((pt) => pt.startsWith(path))) {
    $(el).addClass(matchClass);
  } else {
    $(el).removeClass(matchClass);
  }
};

/**
 * Checks for match between the KeystrokeBuffer and current known subpaths
 * @function
 */
const checkForShadow = (_: string, path: string): void => {
  $(cursorEl)
    .removeClass(shadowSlashClass)
    .text(' ');
  if (knownSubPaths[path]) {
    $(cursorEl)
      .addClass(shadowSlashClass)
      .text('');
  }
};

/**
 * Redirects the page to a new path
 * @function
 */
const redirect = (path: string): void => {
  window.location.replace(`${window.location.origin}${path}`);
};

/**
 * Process user's keydown
 * @function
 */
const handleKeyDown = (evt: KeyboardEvent): void => {
  evt.preventDefault();
  State.key.pressed = true;
  pauseCursorWhileTyping();
  State.updateBuffer(evt, State.el.shell);
  update(State.el.shell);
  scrollIntoView(shellParentEl, State.el.cursor);
};

/**
 * Process user's keyup
 * @function
 */
const handleKeyUp = (): void => {
  blinkCursorWhileNotTyping();
};

/**
 * Scroll KeystrokeBuffer path into view
 * @function
 */
const scrollIntoView = (shell: string, cursor: string): void => {
  if ($(shell)) {
    $(shell).scrollLeft = 0;
  }
  if ($(cursor)) {
    $(cursor).scrollIntoView();
  }
};

/**
 * Show cursor blinking if no key has been pressed for _some_ time
 * @function
 */
const blinkCursorWhileNotTyping = (): void => {
  setTimeout((): void => {
    if (performance.now() - State.key.timePressed >= MIN_PAUSE) {
      blinkCursor();
    } else {
      blinkCursorWhileNotTyping();
    }
  }, 50);
};

/**
 * Hide cursor blinking if key is pressed
 * @function
 */
const pauseCursorWhileTyping = (): void => {
  State.key.timePressed = performance.now();
  pauseCursor();
};

/**
 * Blink cursor
 * @function
 */
const blinkCursor = (): void => {
  $(State.el.cursor).addClass(animClass);
};

/**
 * Pause cursor blinking
 * @function
 */
const pauseCursor = (): void => {
  $(State.el.cursor).removeClass(animClass);
};

/**
 * Motivate user to type in shell
 * @function
 */
const motivateShell = (): Typed => {
  $(State.el.cursor).remove();
  const typed = new Typed(State.el.shell, {
    strings: ['key a path and press enter!', ''],
    typeSpeed: 80,
    backSpeed: 10,
    backDelay: 600,
    showCursor: true,
    cursorChar: cursorChar,
    onComplete: (): void => {
      init();
    },
  });

  return typed;
};

/**
 * Allow user to input to KeystrokeBuffer
 * @function
 */
const initKeyPress = (): void => {
  blinkCursor();
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
};

/**
 * Prevent user from input to KeystrokeBuffer
 * @function
 */
const preventKeyPress = (): void => {
  pauseCursor();
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
};

/**
 * Initiate user shell
 * @function
 */
const init = (shell: string = State.el.shell): void => {
  State.el.shell = shell;
  State.key.pressed = false;
  initKeyPress();

  setTimeout(() => {
    if (!State.key.pressed) {
      preventKeyPress();
      motivateShell();
    }
  }, 3000);
};

/**
 * Apply an animation to some element
 * @function
 */
const processAnimations = (selector: string, cl: string): void => {
  $(selector).removeClass(cl);
  setTimeout((): void => {
    $(selector).addClass(cl);
  }, 200);
};

/**
 * Clear suggested paths on mobile
 * @function
 */
const clearMobilePaths = (container: string): void => {
  for (let i = State.mobile.pathEls.length - 1; i >= 0; --i) {
    State.mobile.pathEls[i].removeEventListener('click', handleMobilePathClick);
    State.mobile.pathEls[i].removeEventListener('click', handleBackClick);
    State.mobile.pathEls[i].remove();
    State.mobile.pathEls.pop();
  }
  const wrappers = [].slice.call(document.querySelectorAll(`${container} div`));
  if (wrappers) {
    for (const wrapper of wrappers) {
      wrapper.remove();
    }
  }
};

/**
 * Remove breaking characters in a string.
 * This prevents text overflow on the mobile scroller.
 * @function
 */
const removeBreakingChars = (str: string): string =>
  str.replace(/-/g, '\u2011');

/**
 * Add a suggested path on mobile
 * @function
 */
const addSubPathEl = (sub: string): void => {
  $(shellEl).text('');
  if (knownSubPaths[sub]) {
    $(shellEl).text(sub);
  }
};

/**
 * Add `back` to suggested paths on mobile
 * @function
 */
const addBackEl = (container: string, sub: string): void => {
  if (knownSubPaths[sub]) {
    const backWrap = document.createElement('div');
    $(container).appendChild(backWrap);
    const div = document.createElement('div');
    div.innerText = '<';
    div.addClass('path').addClass('back');
    div.addEventListener('click', handleBackClick);
    State.mobile.pathEls.push(div);
    backWrap.appendChild(div);
  }
};

/**
 * Add suggested paths on mobile
 * @function
 */
const addMobilePaths = (container: string): void => {
  clearMobilePaths(container);
  const subPath = State.mobile.subPaths[State.mobile.subPaths.length - 1];
  const paths = knownSubPaths[subPath] || knownPaths;
  addSubPathEl(subPath);
  const wrapper = document.createElement('div');
  $(container).appendChild(wrapper);
  for (const path of paths) {
    const div = document.createElement('div');
    div.innerText = removeBreakingChars(path);
    div.addClass('path');
    div.addEventListener('click', handleMobilePathClick);
    State.mobile.pathEls.push(div);
    wrapper.appendChild(div);
  }
  addBackEl(container, subPath);
};

/**
 * Initiliaze shell and KeystrokeBuffer on mobile
 * @function
 */
const mobile = (container: string): void => {
  addMobilePaths(container);
  $(container).addClass('finally');
};

/**
 * Handle press of suggested paths on mobile
 * @function
 */
function handleMobilePathClick(this: HTMLDivElement): void {
  processAnimations(mobileSelectorEl, 'finally');
  if (knownSubPaths[this.innerText]) {
    State.mobile.subPaths.push(this.innerText);
    addMobilePaths(mobileSelectorEl);
  } else {
    $(shellEl).text(
      `${State.mobile.subPaths[State.mobile.subPaths.length - 1]}${
        this.innerText
      }`,
    );
    redirect($(shellEl).innerText);
  }
}

/**
 * Handle press of `back` on suggested paths on mobile
 * @function
 */
function handleBackClick(): void {
  processAnimations(mobileSelectorEl, 'finally');
  State.mobile.subPaths.pop();
  addMobilePaths(mobileSelectorEl);
}

export { init, mobile, scrollIntoView };
