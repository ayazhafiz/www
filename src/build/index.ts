(window as any).__forceSmoothScrollPolyfill__ = true;

import { $, $$ } from '../ts/util/el';
import { polyfill } from 'smoothscroll-polyfill';

polyfill();

import './index.scss';

function scrollIntoView(this: HTMLInputElement) {
  if (this.checked) {
    setTimeout(
      () => $(`#${this.name}`).scrollIntoView({ behavior: 'smooth' }),
      50,
    );
  }
}

function toggleQuasiText(this: HTMLElement) {
  this.classList.toggle('mobile-touch');
}

function openResearch(this: HTMLInputElement) {
  $$('input').forEach(i => (<HTMLInputElement>i).checked = false);
  (<HTMLInputElement>$('input#tab-1')).checked = true;
  scrollIntoView.bind(this);
}

(() => {
  $$('.quasi').forEach(q => ['touchstart', 'touchend'].forEach(
    e => q.addEventListener(e, toggleQuasiText)
  ));
  $$('input').forEach(i => i.addEventListener('change', scrollIntoView);
  $('a.tonglab').addEventListener('click', openResearch);
})();
