import { $ } from '../util/el';
import { whale } from '../gfx/whale';

/**
 * Handles navigation between different pages on the index view
 * @function
 */
const pageMove = (page: number): void => {
  switch (page) {
    case 0:
      $('#tween-svg').hide();
      whale.forEach(el => el.hide());
      break;
    case 1:
      $('.particles canvas').hide();
      whale.forEach(el => el.hide());
      break;
    case 2:
      $('.particles canvas').hide();
      $('#tween-svg').hide();
      break;
    case 3:
      $('.particles canvas').hide();
      $('#tween-svg').hide();
      $('.info').addClass('slid-up');
      whale.forEach(el => el.addClass('pause'));
      break;
  }
};

export { pageMove };
