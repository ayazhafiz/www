import $ from 'jquery';
import 'jquery-scrollify';
import { currentPage as tPage } from './currentPage.js';

export default function() {
  let currentPage = tPage;
  $.scrollify({
    section : ".scroll-container",
    easing: "easeOutExpo",
    scrollSpeed: 750,
    setHeights: false,
    overflowScroll: false,
    before: (page, ar) => {

      // on scroll, update page number
      $('.mouse').addClass('scrolled').text(
        ((page == 3) ? '3.1' : `${page + 1}`) + ' | 3'
      );

      if (currentPage == 0 && page == 1) {
        $('#particles canvas').hide();
        $('#tween-svg').show();
      } else if (currentPage == 1 && page == 0) {
        $('#particles canvas').show();
        $('#tween-svg').hide();
      } else if (currentPage == 1 && page == 2) {
        $('.header, .outer-wrapper').show();
        $('#tween-svg').hide();
      } else if (currentPage == 2 && page == 1) {
        $('.header, .outerWrapper').hide();
        $('#tween-svg').show();
      } else if (currentPage == 2 && page == 3) {
        $('.info').addClass('slid-up');
      } else if (currentPage == 3 && page == 2) {
        $('.info').removeClass('slid-up');
      } currentPage = page;
    }
  });
  // allow for arrow pagination
  document.addEventListener('mousedown', function(e) {
    e.preventDefault();
  });
}