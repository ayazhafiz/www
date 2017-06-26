import $ from 'jquery';
import { currentPage } from './currentPage.js';

export default function() {
  switch(currentPage) {
    case 0:
      $('#tween-svg').hide();
      $('.header, .outerWrapper').hide();
      break;
    case 1:
      $('#particles canvas').hide();
      $('.header, .outerWrapper').hide();
      break;
    case 2:
      $('#particles canvas').hide();
      $('#tween-svg').hide();
      break;
    case 3:
      $('#particles canvas').hide();
      $('#tween-svg').hide();
      $('.info').addClass('slid-up');
      break;
  } let scrolled = false;
}