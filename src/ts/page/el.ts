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

const $ = (el: string): Element => {
  Element.prototype.hide = function(): Element {
    this.style.display = 'none';
    return this;
  };
  Element.prototype.show = function(): Element {
    this.style.display = '';
    return this;
  };
  Element.prototype.mask = function(): Element {
    this.style.visibility = 'hidden';
    return this;
  };
  Element.prototype.unmask = function(): Element {
    this.style.visibility = '';
    return this;
  };
  Element.prototype.text = function(str: string): Element {
    this.textContent = str;
    return this;
  };
  Element.prototype.addClass = function(cl: string): Element {
    this.classList.add(cl);
    return this;
  };
  Element.prototype.removeClass = function(cl: string): Element {
    this.classList.remove(cl);
    return this;
  };

  return document.querySelector(el);
};

export { $ };
