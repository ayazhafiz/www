import { renderParticles } from '../ts/gfx/particles';
import { initScrollify } from '../ts/page/scrollify';
import { showCurrentPage } from '../ts/page/current';
import { tween } from '../ts/gfx/tween';

import './index_ui.scss';

const PARTICLE_DENSITY = 135;
const NUM_CIRCLES = 20;
const SCROLL_SPEED = 750;

/**
 * Build the pages of the index view
 * @event
 */
const build = () => {
  // apply gfx
  renderParticles('particles', PARTICLE_DENSITY);
  tween(NUM_CIRCLES);

  // apply scrollables
  initScrollify(SCROLL_SPEED);
  showCurrentPage();
};

document.addEventListener('DOMContentLoaded', build);
