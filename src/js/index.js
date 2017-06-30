import particles from './gfx/particles.js';
import scrollify from './page/scrollify.js';
import pageMove from './page/pageMove.js';
import tween from './gfx/tween.js';
import mConfig from './page/mathjaxConfig.js';
import './third-party/prism.min.js';

document.addEventListener('DOMContentLoaded', function() {
  scrollify();
  pageMove();
  mConfig();

  // apply gfx
  particles();
  tween();
}, false);