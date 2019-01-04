import { $, $$ } from '../ts/util/el';
import { polyfill as invokePolyfill } from 'smoothscroll-polyfill';

import './index.scss';

(window as any).__forceSmoothScrollPolyfill__ = true;
invokePolyfill();

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

(() => {
  $$('.quasi').forEach((q) =>
    ['touchstart', 'touchend'].forEach((e) =>
      q.addEventListener(e, toggleQuasiText),
    ),
  );

  $$('input').forEach((i) => i.addEventListener('change', scrollIntoView));
})();
