declare global {
  interface SVGElement {
    hide(): SVGElement;
    show(): SVGElement;
    mask(): SVGElement;
    unmask(): SVGElement;
    text(str: string): SVGElement;
    addClass(klass: string): SVGElement;
    removeClass(klass: string): SVGElement;
  }
}

/**
 * Hides an element
 * @extends SVGElement
 */
SVGElement.prototype.hide = function(this: SVGElement) {
  this.style.display = 'none';

  return this;
};

/**
 * Shows an element
 * @extends SVGElement
 */
SVGElement.prototype.show = function(this: SVGElement): SVGElement {
  this.style.display = '';

  return this;
};

/**
 * Masks an element
 * @extends SVGElement
 */
SVGElement.prototype.mask = function(this: SVGElement): SVGElement {
  this.style.visibility = 'hidden';

  return this;
};

/**
 * Unmasks an element
 * @extends SVGElement
 */
SVGElement.prototype.unmask = function(this: SVGElement): SVGElement {
  this.style.visibility = '';

  return this;
};

/**
 * Sets the text content of an element
 * @extends SVGElement
 */
SVGElement.prototype.text = function(
  this: SVGElement,
  str: string,
): SVGElement {
  this.textContent = str;

  return this;
};

/**
 * Adds a class to an element
 * @extends SVGElement
 */
SVGElement.prototype.addClass = function(
  this: SVGElement,
  klass: string,
): SVGElement {
  this.classList.add(klass);

  return this;
};

/**
 * Removes a class from an element
 * @extends SVGElement
 */
SVGElement.prototype.removeClass = function(
  this: SVGElement,
  klass: string,
): SVGElement {
  this.classList.remove(klass);

  return this;
};

export {};
