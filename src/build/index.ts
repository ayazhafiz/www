(window as any).__forceSmoothScrollPolyfill__ = true;

import { $, $$ } from '../ts/util/el';
import { polyfill } from 'smoothscroll-polyfill';

polyfill();

import './index.scss';

function toggleQuasiText() {
  this.classList.toggle('mobile-touch');
}

function openResearch() {
  const inputs = $$('input');
  for (let input of inputs) (input as HTMLInputElement).checked = false;
  ($('input#tab-1') as HTMLInputElement).checked = true;
  scrollIntoView.bind(this);
}

function scrollIntoView() {
  if (this.checked) {
    setTimeout(
      () => $(`#${this.name}`).scrollIntoView({ behavior: 'smooth' }),
      50
    );
  }
}

function addListeners() {
  const quasis = $$('.quasi');
  for (let quasi of quasis) {
    quasi.addEventListener('touchstart', toggleQuasiText);
    quasi.addEventListener('touchend', toggleQuasiText);
  }

  const inputs = $$('input');
  for (let input of inputs) input.addEventListener('change', scrollIntoView);

  $('a.tonglab').addEventListener('click', openResearch);
}

document.addEventListener('DOMContentLoaded', addListeners);
