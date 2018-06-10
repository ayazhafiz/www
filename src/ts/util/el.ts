import './el/HTMLElement';
import './el/SVGElement';

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
