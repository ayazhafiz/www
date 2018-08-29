// Elements on error page
const shellEl = '#sh';
const shellParentEl = '.shell';
const cursorEl = '.typed-cursor';
const crystalLogoEl = '.crystal-logo';
const mobileSelectorEl = '.mobile-path-selector';
const firstEl = '#open-1';
const secondEl = '#path-1';
const thirdEl = '#open-2';
const loadErrorEl = '#load-error';
const loadMessageEl = '#load-message';
const userPromptEl = '#user-prompt';

// Relevant classes on error page
const matchClass = 'path';
const animClass = 'anim';
const shadowSlashClass = 'shadow-slash';

// Known page paths
const knownPaths = [
  '/',
  '/atomas',
  '/blog',
  '/cc',
  '/mail',
  '/meethere',
  '/movie-emoji',
  '/notes',
  '/recipes',
  '/try',
  '/vector',
];
const knownSubPaths = {
  '/mail': ['/signup'],
  '/try': ['/anoop', '/rod'],
};
const knownFullPaths = knownPaths.reduce((full, path) => {
  if (knownSubPaths[path]) {
    return full.concat(knownSubPaths[path].map((sub) => `${path}${sub}`));
  }

  return full.concat([path]);
}, []);

// Known environment strings
const cursorChar = '&nbsp;';
const pathString = [decodeURI(`/${window.location.pathname.slice(1)}^500`)];
const openString = ['open', 'open&nbsp;'];

export {
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
  matchClass,
  animClass,
  shadowSlashClass,
  knownPaths,
  knownSubPaths,
  knownFullPaths,
  cursorChar,
  pathString,
  openString,
};
