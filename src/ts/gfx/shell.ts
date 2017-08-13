import * as Typed from 'typed.js';
import { $ } from '../page/el';
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
  animClass
} from '../env/error_env';

const range = (start: number, end: number): Array<number> =>
  Array.from(new Array(end - start + 1), (n, i) => start + i);

// keyspace for keystroke auth
const KEY = {
  backspace: 8,
  tab: 9,
  enter: 13,
  space: 32,
  delete: 46,
  digits: range(48, 57),
  letters: range(65, 90),
  extraneous: range(186, 192).concat(range(219, 222))
};
const SLASH = '/';
const MIN_PAUSE = 500;

class State {
  static buffer = '';
  static subPath = '';
  static sug = {
    paths: knownPaths,
    index: 0
  };
  static key = {
    pressed: null,
    timePressed: 0,
    lastKey: KEY['tab']
  };
  static el = {
    cursor: cursorEl,
    shell: shellEl
  };
  static mobile = {
    pathEls: [],
    subPaths: ['']
  };

  private static resetIndex(): void {
    this.sug.index = 0;
  }
  private static incIndex(): void {
    this.sug.index++;
    if (this.sug.index >= this.sug.paths.length) {
      this.sug.index = 0;
    }
  }
  static get nextPath(): string {
    const pt = this.sug.paths[this.sug.index];
    State.incIndex();
    return pt || '';
  }
  static set pathsLike(query: string) {
    this.sug.paths = knownPaths.filter(pt => pt.startsWith(query));
    const idx = query.lastIndexOf('/');
    const subPath = idx === 0 ? query : query.substring(0, idx);
    if (knownSubPaths[subPath]) {
      query = idx === 0 ? '' : query.substring(idx);
      this.sug.paths = knownSubPaths[subPath].filter(pt =>
        pt.startsWith(query)
      );
    }
    this.subPath = knownSubPaths[subPath] ? subPath : '';

    State.resetIndex();
  }
}

// returns the path/text of an element and whether the path has a leading slash
const getPath = (el: string): [string, boolean] => {
  const path = $(el).innerText;
  const leadingSlash = path.slice(0, 1) === SLASH;
  return [path, leadingSlash];
};

// sanitizes the path of an element by forcing leading slash
const sanitize = (el: string): string => {
  const [path, leadingSlash] = getPath(el);
  const sanitizedPath = leadingSlash ? path : `${SLASH}${path}`;
  return sanitizedPath;
};

// updates a particular element with the buffer and adds match-to-path state
const update = (el: string): void => {
  $(el).innerText = State.buffer;

  const sanitizedPath = sanitize(el);
  checkForMatch(el, sanitizedPath);
  checkForShadow(el, sanitizedPath);
};

const checkForMatch = (el: string, path: string): void => {
  if (knownFullPaths.some(pt => pt.startsWith(path))) {
    $(el).addClass(matchClass);
  } else {
    $(el).removeClass(matchClass);
  }
};

const checkForShadow = (el: string, path: string): void => {
  $(cursorEl).removeClass(shadowSlashClass).text(' ');
  if (knownSubPaths[path]) {
    $(cursorEl).addClass(shadowSlashClass).text('');
  }
};

// updates the buffer to its match-to-path state string
const tabBuffer = (el: string): void => {
  const sanitizedPath = sanitize(el);
  const leadingSlash = getPath(el)[1];
  if (State.key.lastKey !== KEY['tab']) {
    State.pathsLike = sanitizedPath;
  }
  const oldBuffer = State.buffer;
  const newBuffer = `${State.subPath}${State.nextPath}`;
  if (newBuffer) {
    State.buffer =
      leadingSlash || oldBuffer === '' ? newBuffer : newBuffer.slice(1);
  }
};

const redirect = (path: string): void => {
  window.location.replace(`${window.location.origin}${path}`);
};

// updates the buffer based on a variety of keystrokes
const updateBuffer = (evt: KeyboardEvent, el: string): void => {
  let code = evt.keyCode || evt.which;
  const sanitizedPath = sanitize(el);

  if (
    (evt.ctrlKey || evt.metaKey || evt.altKey) &&
    !(code === KEY['backspace'] || code === KEY['delete'])
  ) {
  } else if (code === KEY['enter']) {
    // if enter, redirect user to new path
    redirect(encodeURI(sanitizedPath));
  } else if (code === KEY['tab']) {
    // if tab, attempt to match-to-path buffer
    tabBuffer(el);
  } else if (code === KEY['space']) {
    // if space, add to buffer
    State.buffer += ' ';
  } else if (code === KEY['backspace'] || code === KEY['delete']) {
    // if backspace/delete, remove character (whole line, if modifier is active)
    State.buffer = State.buffer.slice(0, -1);
    if (evt.ctrlKey || evt.metaKey) State.buffer = '';
  } else if (
    KEY['digits'].includes(code) || // digits
    KEY['letters'].includes(code) || // letters
    KEY['extraneous'].includes(code) // extraneous
  ) {
    // if operable character, add to buffer
    let st = evt.key || String.fromCharCode(code);
    if (!evt.shiftKey) {
      st = st.toLowerCase();
    }
    State.buffer += st;
  }
  State.key.lastKey = code;
};

// shuffle key through buffer process
const handleKeyDown = (evt: KeyboardEvent): void => {
  evt.preventDefault();
  State.key.pressed = true;
  pauseCursor();
  updateBuffer(evt, State.el.shell);
  update(State.el.shell);
  scrollIntoView(shellParentEl, State.el.cursor);
};

const handleKeyUp = (): void => {
  blinkCursorWhileNotTyping();
};

const scrollIntoView = (shell: string, cursor: string): void => {
  if ($(shell)) $(shell).scrollLeft = 0;
  if ($(cursor)) $(cursor).scrollIntoView();
};

// blink cursor if no key has been pressed for some time
const blinkCursorWhileNotTyping = (): void => {
  setTimeout((): void => {
    if (performance.now() - State.key.timePressed >= MIN_PAUSE) {
      blinkCursor();
    } else {
      blinkCursorWhileNotTyping();
    }
  }, 50);
};

// don't blink cursor if key is pressed
const pauseCursorWhileTyping = (): void => {
  State.key.timePressed = performance.now();
  pauseCursor();
};

const blinkCursor = (): void => {
  $(State.el.cursor).addClass(animClass);
};

const pauseCursor = (): void => {
  $(State.el.cursor).removeClass(animClass);
};

// motivate user to type in shell if not done yet
const motivateShell = (): void => {
  $(State.el.cursor).remove();
  new Typed(State.el.shell, {
    strings: ['key a path and press enter!', ''],
    typedSpeed: 80,
    backSpeed: 10,
    backDelay: 600,
    showCursor: true,
    cursorChar: cursorChar,
    onComplete: (): void => {
      init();
    }
  });
};

const initKeyPress = (): void => {
  blinkCursor();
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
};

const preventKeyPress = (): void => {
  pauseCursor();
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
};

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

function handleMobilePathClick(): void {
  processAnimations(mobileSelectorEl, 'finally');
  if (knownSubPaths[this.innerText]) {
    State.mobile.subPaths.push(this.innerText);
    addMobilePaths(mobileSelectorEl);
  } else {
    $(shellEl).text(
      `${State.mobile.subPaths[State.mobile.subPaths.length - 1]}${this
        .innerText}`
    );
    redirect($(shellEl).innerText);
  }
}

function handleBackClick(): void {
  processAnimations(mobileSelectorEl, 'finally');
  State.mobile.subPaths.pop();
  addMobilePaths(mobileSelectorEl);
}

const processAnimations = (selector: string, cl: string): void => {
  $(selector).removeClass(cl);
  setTimeout((): void => {
    $(selector).addClass(cl);
  }, 200);
};

const clearMobilePaths = (container: string): void => {
  for (let i = State.mobile.pathEls.length - 1; i >= 0; i--) {
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

const addSubPathEl = (sub: string): void => {
  $(shellEl).text('');
  if (knownSubPaths[sub]) {
    $(shellEl).text(sub);
  }
};

const addBackEl = (container: string, sub: string): void => {
  if (knownSubPaths[sub]) {
    let backWrap = document.createElement('div');
    $(container).appendChild(backWrap);
    const div = document.createElement('div');
    div.innerText = '<';
    div.addClass('path').addClass('back');
    div.addEventListener('click', handleBackClick);
    State.mobile.pathEls.push(div);
    backWrap.appendChild(div);
  }
};

const addMobilePaths = (container: string): void => {
  clearMobilePaths(container);
  const subPath = State.mobile.subPaths[State.mobile.subPaths.length - 1];
  const paths = knownSubPaths[subPath] || knownPaths;
  addSubPathEl(subPath);
  let wrapper = document.createElement('div');
  $(container).appendChild(wrapper);
  for (const path of paths) {
    const div = document.createElement('div');
    div.innerText = path;
    div.addClass('path');
    div.addEventListener('click', handleMobilePathClick);
    State.mobile.pathEls.push(div);
    wrapper.appendChild(div);
  }
  addBackEl(container, subPath);
};

const mobile = (container: string): void => {
  addMobilePaths(container);
  $(container).addClass('finally');
  $(cursorEl).addClass('anim');
};

export { init, mobile, scrollIntoView };
