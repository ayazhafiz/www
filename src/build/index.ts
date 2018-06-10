(window as any).__forceSmoothScrollPolyfill__ = true;

import { $, $$ } from '../ts/util/el';
import { polyfill } from 'smoothscroll-polyfill';

polyfill();

import './index.scss';

function toggleQuasiText(this: HTMLElement) {
  this.classList.toggle('mobile-touch');
}

function openResearch(this: HTMLInputElement) {
  const inputs = $$('input');
  for (const input of inputs) {
    (<HTMLInputElement>input).checked = false;
  }
  (<HTMLInputElement>$('input#tab-1')).checked = true;
  scrollIntoView.bind(this);
}

function scrollIntoView(this: HTMLInputElement) {
  if (this.checked) {
    setTimeout(
      () => $(`#${this.name}`).scrollIntoView({ behavior: 'smooth' }),
      50,
    );
  }
}

(() => {
  const quasis = $$('.quasi');
  for (const quasi of quasis) {
    quasi.addEventListener('touchstart', toggleQuasiText);
    quasi.addEventListener('touchend', toggleQuasiText);
  }

  const inputs = $$('input');
  for (const input of inputs) {
    input.addEventListener('change', scrollIntoView);
  }

  $('a.tonglab').addEventListener('click', openResearch);
})();
