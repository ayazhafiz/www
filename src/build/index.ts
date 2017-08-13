import { particles } from '../ts/gfx/particles';
import { scroll as scrollify } from '../ts/page/scrollify';
import { page as currentPage } from '../ts/page/currentPage';
import { pageMove } from '../ts/page/pageMove';
import { tween } from '../ts/gfx/tween';
import '../ts/third-party/prism.min.js';

import './index.scss';

const PARTICLE_DENSITY = 135;
const NUM_CIRCLES = 20;
const SCROLL_SPEED = 750;

function build() {
  // apply gfx
  particles(PARTICLE_DENSITY);
  tween(NUM_CIRCLES);

  // apply scrollables
  scrollify(SCROLL_SPEED);
  pageMove(currentPage());

  // breakdown
  document.removeEventListener('DOMContentLoaded', build);
}
document.addEventListener('DOMContentLoaded', build);
