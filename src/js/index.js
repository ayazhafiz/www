import particles from './gfx/particles.js';
import scrollify from './page/scrollify.js';
import pageMove from './page/pageMove.js';
import tween from './gfx/tween.js';
import './third-party/prism.min.js';

document.addEventListener('DOMContentLoaded', () => {
  scrollify();
  pageMove();

  // apply gfx
  particles();
  tween();
}, false);