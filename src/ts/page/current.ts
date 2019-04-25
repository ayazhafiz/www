import { $ } from '../util/el';
import { whale } from '../gfx/whale';

/**
 * Finds the current page based on search query
 * @function
 */
const currentPage = (): number =>
  parseInt(window.location.href.slice(-1), 10) - 1 || 0;

/**
 * Handles navigation between different pages on the index view
 * @function
 */
const showCurrentPage = (): void => {
  switch (currentPage()) {
    case 0:
      $('#tween-svg').hide();
      whale.forEach((el) => el.hide());
      break;
    case 1:
      $('.particles canvas').hide();
      whale.forEach((el) => el.hide());
      break;
    case 2:
      $('.particles canvas').hide();
      $('#tween-svg').hide();
      break;
    case 3:
      $('.particles canvas').hide();
      $('#tween-svg').hide();
      $('.info').addClass('slid-up');
      whale.forEach((el) => el.addClass('pause'));
      break;
  }
};

export { currentPage, showCurrentPage };
