declare global {
  interface HTMLElement {
    hide(): HTMLElement;
    show(): HTMLElement;
    mask(): HTMLElement;
    unmask(): HTMLElement;
    text(str: string): HTMLElement;
    addClass(klass: string): HTMLElement;
    removeClass(klass: string): HTMLElement;
  }
}

/**
 * Hides an element
 * @extends HTMLElement
 */
HTMLElement.prototype.hide = function(this: HTMLElement) {
  this.style.display = 'none';

  return this;
};

/**
 * Shows an element
 * @extends HTMLElement
 */
HTMLElement.prototype.show = function(this: HTMLElement): HTMLElement {
  this.style.display = '';

  return this;
};

/**
 * Masks an element
 * @extends HTMLElement
 */
HTMLElement.prototype.mask = function(this: HTMLElement): HTMLElement {
  this.style.visibility = 'hidden';

  return this;
};

/**
 * Unmasks an element
 * @extends HTMLElement
 */
HTMLElement.prototype.unmask = function(this: HTMLElement): HTMLElement {
  this.style.visibility = '';

  return this;
};

/**
 * Sets the text content of an element
 * @extends HTMLElement
 */
HTMLElement.prototype.text = function(
  this: HTMLElement,
  str: string,
): HTMLElement {
  this.textContent = str;

  return this;
};

/**
 * Adds a class to an element
 * @extends HTMLElement
 */
HTMLElement.prototype.addClass = function(
  this: HTMLElement,
  klass: string,
): HTMLElement {
  this.classList.add(klass);

  return this;
};

/**
 * Removes a class from an element
 * @extends HTMLElement
 */
HTMLElement.prototype.removeClass = function(
  this: HTMLElement,
  klass: string,
): HTMLElement {
  this.classList.remove(klass);

  return this;
};

/**
 * Queries an element in the document
 * @function
 */
const $ = (el: string): HTMLElement => {
  return document.querySelector(el);
};

/**
 * Queries multiple elements in the document
 * @function
 */
const $$ = (el: string): HTMLElement[] => {
  return Array.from(document.querySelectorAll(el));
};

export { $, $$ };
