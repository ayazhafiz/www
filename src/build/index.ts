import './index.scss';

import {polyfill as invokePolyfill} from 'smoothscroll-polyfill';

import {$, $$} from '../ts/util/el';

(window as any).__forceSmoothScrollPolyfill__ = true;
invokePolyfill();

function scrollIntoView(this: HTMLInputElement) {
  if (this.checked) {
    setTimeout(
        () => $(`#${this.name}`).scrollIntoView({behavior: 'smooth'}),
        50,
    );
  }
}

function toggleQuasiText(this: HTMLElement) {
  this.classList.toggle('mobile-touch');
}

(() => {
  // Toggle quasi text on touch events.
  $$('.quasi').forEach(
      (q) => ['touchstart', 'touchend'].forEach(
          (e) => q.addEventListener(e, toggleQuasiText),
          ),
  );

  // Open each section when it is clicked.
  $$('input').forEach((i) => i.addEventListener('change', scrollIntoView));

  // Open sections when data links to them are clicked.
  $$('[data-open]').forEach(link => {
    const targetStr = `#${link.dataset['open']}`;
    link.addEventListener('click', () => $(`${targetStr} label`).click());
  });
})();
