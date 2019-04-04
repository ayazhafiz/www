import { $ } from '../util/el';
import { currentPage } from './current';
import { whale } from '../gfx/whale';
import scrollify from 'jquery-scrollify';

/**
 * Manages memory and application load during pagination of the index view
 * @function
 */
const initScrollify = (speed: number): void => {
  let lastPage = currentPage();
  scrollify({
    section: '.scroll-container',
    easing: 'easeOutExpo',
    scrollSpeed: speed,
    setHeights: false,
    overflowScroll: false,
    before: (newPage: number): void => {
      // on scroll, update newPage number
      $('.mouse')
        .addClass('scrolled')
        .text((newPage === 3 ? '3.1' : `${newPage + 1}`) + ' | 3');

      if (lastPage === 0 && newPage === 1) {
        $('#particles canvas').hide();
        $('#tween-svg').show();
      } else if (lastPage === 1 && newPage === 0) {
        $('#particles canvas').show();
        $('#tween-svg').hide();
      } else if (lastPage === 1 && newPage === 2) {
        whale.forEach((el) => el.show());
        $('#tween-svg').hide();
      } else if (lastPage === 2 && newPage === 1) {
        whale.forEach((el) => el.hide());
        $('#tween-svg').show();
      } else if (lastPage === 2 && newPage === 3) {
        $('.info').addClass('slid-up');
        whale.forEach((el) => el.addClass('pause'));
      } else if (lastPage === 3 && newPage === 2) {
        $('.info').removeClass('slid-up');
        whale.forEach((el) => el.removeClass('pause'));
      }
      lastPage = newPage;
    },
  });

  // allow for arrow pagination
  document.addEventListener(
    'mousedown',
    (e): void => {
      e.preventDefault();
    },
  );
};

export { initScrollify };
