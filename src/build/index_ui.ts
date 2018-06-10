import { renderParticles } from '../ts/gfx/particles';
import { scroll as scrollify } from '../ts/page/scrollify';
import { page as currentPage } from '../ts/page/currentPage';
import { pageMove } from '../ts/page/pageMove';
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
  scrollify(SCROLL_SPEED);
  pageMove(currentPage());
};

build();
