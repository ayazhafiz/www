const shellEl = '#sh';
const shellParentEl = '.shell';
const cursorEl = '.typed-cursor';
const crystalLogoEl = '.crystal-logo';
const mobileSelectorEl = '.mobile-path-selector';
const matchClass = 'path';
const animClass = 'anim';
const shadowSlashClass = 'shadow-slash';
const cursorChar = '&nbsp;';
const knownPaths = [
  '/',
  '/atomas',
  '/blog',
  '/cc',
  '/emoji',
  '/meethere',
  '/try',
  '/vector'
];
const knownSubPaths = {
  '/try': ['/rod']
};
const knownFullPaths = knownPaths.reduce((full, path) => {
  if (knownSubPaths[path]) {
    return full.concat(knownSubPaths[path].map(sub => `${path}${sub}`));
  }
  return full.concat([path]);
}, []);
const firstEl = '#open-1';
const secondEl = '#path-1';
const thirdEl = '#open-2';
const loadErrorEl = '#load-error';
const loadMessageEl = '#load-message';
const userPromptEl = '#user-prompt';
const pathString = [decodeURI(`/${window.location.pathname.slice(1)}^500`)];
const openString = ['open', 'open&nbsp;'];

export {
  shellEl,
  shellParentEl,
  cursorEl,
  crystalLogoEl,
  mobileSelectorEl,
  matchClass,
  animClass,
  shadowSlashClass,
  cursorChar,
  knownPaths,
  knownSubPaths,
  knownFullPaths,
  firstEl,
  secondEl,
  thirdEl,
  loadErrorEl,
  loadMessageEl,
  userPromptEl,
  pathString,
  openString
};
