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

function toggleDisplay(this: HTMLElement) {
  const curDisplay = this.style.display;
  this.style.display = !curDisplay ? 'none' : '';
}

function toggleClasses(this: HTMLElement, query: string) {
  // Save query used to search for this element in toggling classes, if it
  // hasn't been already.
  if (!this.dataset.query) {
    this.dataset.query = query;
  }

  // Class prefixes, saved as comma-seperated strings in the query.
  const prefixes = query.split(',');

  // Save classes to toggle on the element, if they haven't been already.
  if (!this.dataset.cachedClass) {
    const cl = Array.from(this.classList);
    this.dataset.cachedClass =
        prefixes.map(p => cl.find(c => c.startsWith(p))!).join(',');
  }
  const classNames = this.dataset.cachedClass.split(',');
  for (const name of classNames) {
    this.classList.toggle(name);
  }
}

function toggleColorMode(this: HTMLElement) {
  this.classList.contains('light-mode') ?
      this.classList.replace('light-mode', 'dark-mode') :
      this.classList.replace('dark-mode', 'light-mode');
}

function addOptionsDisplayListeners() {
  // Hide options if the options text overlaps with the content. Otherwise, show
  // the page options.
  function checkPositionAndSetDisplay() {
    const options = $('.page-options');
    options.style.display = '';

    const optionsBox = $('.options-text').getBoundingClientRect();
    const contentBox = $('section').getBoundingClientRect();
    if (optionsBox.left + optionsBox.width > contentBox.left) {
      options.style.display = 'none';
    }
  }

  window.addEventListener('resize', checkPositionAndSetDisplay);
  checkPositionAndSetDisplay();
}

interface OptionStore {
  [id: string]: 'checked'|'unchecked';
}
function saveOptionToStorage(this: HTMLInputElement) {
  const store: OptionStore =
      JSON.parse(window.localStorage.getItem('options')) || {};
  const checkValue = this.checked ? 'checked' : 'unchecked';
  store[this.id] = checkValue;

  window.localStorage.setItem('options', JSON.stringify(store));
}
function loadOptionsFromStorage() {
  const store: OptionStore = JSON.parse(window.localStorage.getItem('options'));
  if (!store || !store['less-colors']) {
    // Show less colors by default
    $('#less-colors').click();
  }
  if (!store) {
    return;
  }

  for (const [id, checkValue] of Object.entries(store)) {
    switch (checkValue) {
      case 'checked':
        $(`#${id}`).click();
        break;
      default:
        break;
    }
  }
}

(() => {
  // Toggle quasi text on touch events.
  $$('.quasi').forEach(
      (q) => ['touchstart', 'touchend'].forEach(
          e => q.addEventListener(e, toggleQuasiText, {passive: true}),
          ),
  );

  // Open each section when it is clicked.
  $$('input.expand')
      .forEach((i) => i.addEventListener('change', scrollIntoView));

  // Open sections when data links to them are clicked.
  $$('[data-open]').forEach(link => {
    const targetStr = link.dataset['open'];
    link.addEventListener('click', () => $(`${targetStr} label`).click());
  });

  // Toggle display of elements when corresponding option is clicked.
  $$('[data-toggle-display]').forEach(opt => {
    opt.addEventListener('change', event => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const targets = event.target.dataset['toggleDisplay'];
      $$(targets).forEach(el => toggleDisplay.bind(el)());
    });
  });

  // Toggle classes of elements when corresponding option is clicked.
  $$('[data-toggle-class]').forEach(opt => {
    opt.addEventListener('change', event => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const query = event.target.dataset['toggleClass'];
      let result = $$(`[data-query="${query}"]`);
      // The elements corresponding to these classes haven't been seen yet.
      // Defer to querying for the class names, which must exist.
      if (result.length === 0) {
        const classes = query.split(',');
        const selectorQuery =
            classes.reduce((total, part) => total + `[class*="${part}"]`, '');
        result = $$(selectorQuery);
      }

      result.forEach(el => toggleClasses.bind(el)(query));
    });
  });

  // Toggle color mode when corresponding option is clicked.
  $$('[data-toggle-color-mode]').forEach(opt => {
    opt.addEventListener(
        'change',
        () => $$('.light-mode,.dark-mode')
                  .forEach(el => toggleColorMode.bind(el)()));
  });

  // Hide page options if browser page is too small; show if the browser is
  // large enough.
  addOptionsDisplayListeners();

  // Save options to and load from localStorage as needed.
  $$('.option input').forEach(option => {
    option.addEventListener(
        'change', opt => saveOptionToStorage.bind(opt.target)());
  });
  loadOptionsFromStorage();
})();
