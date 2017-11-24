declare global {
  interface Element {
    hide;
    show;
    mask;
    unmask;
    innerText;
    text;
    addClass;
    removeClass;
  }
}

/**
 * Queries an element in the document
 * @function
 */
const $ = (el: string): Element => {
  /**
   * Hides an element
   * @extends Element
   */
  Element.prototype.hide = function(): Element {
    this.style.display = 'none';
    return this;
  };
  /**
   * Shows an element
   * @extends Element
   */
  Element.prototype.show = function(): Element {
    this.style.display = '';
    return this;
  };
  /**
   * Masks an element
   * @extends Element
   */
  Element.prototype.mask = function(): Element {
    this.style.visibility = 'hidden';
    return this;
  };
  /**
   * Unmasks an element
   * @extends Element
   */
  Element.prototype.unmask = function(): Element {
    this.style.visibility = '';
    return this;
  };
  /**
   * Sets the text content of an element
   * @extends Element
   */
  Element.prototype.text = function(str: string): Element {
    this.textContent = str;
    return this;
  };
  /**
   * Adds a class to an element
   * @extends Element
   */
  Element.prototype.addClass = function(cl: string): Element {
    this.classList.add(cl);
    return this;
  };
  /**
   * Removes a class from an element
   * @extends Element
   */
  Element.prototype.removeClass = function(cl: string): Element {
    this.classList.remove(cl);
    return this;
  };

  return document.querySelector(el);
};

export { $ };
