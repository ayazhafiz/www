import { $ } from '../util/el';
import { page as getPage } from './currentPage';
import { whale } from '../gfx/whale';
import * as scrollify from 'jquery-scrollify';

/**
 * Manages memory and application load during pagination of the index view
 * @function
 */
const scroll = (speed: number): void => {
  let currentPage = getPage();
  scrollify({
    section: '.scroll-container',
    easing: 'easeOutExpo',
    scrollSpeed: speed,
    setHeights: false,
    overflowScroll: false,
    before: (page: number): void => {
      // on scroll, update page number
      $('.mouse')
        .addClass('scrolled')
        .text((page === 3 ? '3.1' : `${page + 1}`) + ' | 3');

      if (currentPage === 0 && page === 1) {
        $('#particles canvas').hide();
        $('#tween-svg').show();
      } else if (currentPage === 1 && page === 0) {
        $('#particles canvas').show();
        $('#tween-svg').hide();
      } else if (currentPage === 1 && page === 2) {
        whale.forEach(el => el.show());
        $('#tween-svg').hide();
      } else if (currentPage === 2 && page === 1) {
        whale.forEach(el => el.hide());
        $('#tween-svg').show();
      } else if (currentPage === 2 && page === 3) {
        $('.info').addClass('slid-up');
        whale.forEach(el => el.addClass('pause'));
      } else if (currentPage === 3 && page === 2) {
        $('.info').removeClass('slid-up');
        whale.forEach(el => el.removeClass('pause'));
      }
      currentPage = page;
    }
  });
  // allow for arrow pagination
  document.addEventListener('mousedown', function(e): void {
    e.preventDefault();
  });
};

export { scroll };
