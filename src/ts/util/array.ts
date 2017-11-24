declare global {
  interface Array<T> {
    max: T;
    min: T;
    range: T[];
  }
}

Object.defineProperties(Array.prototype, {
  max: {
    /**
     * Finds the maximum value of an array
     * @extends Array
     */
    get: function(): number {
      return Math.max.apply(null, this);
    },
    enumerable: true,
    configurable: true
  },
  min: {
    /**
     * Finds the minimum value of an array
     * @extends Array
     */
    get: function(): number {
      return Math.min.apply(null, this);
    },
    enumerable: true,
    configurable: true
  },
  range: {
    /**
     * Generates an Array of a numeric range
     * @extends Array
     */
    get: function(): number[] {
      return Array.from(
        new Array(this.max - this.min + 1),
        (n, i) => this.min + i
      );
    },
    enumerable: true,
    configurable: true
  }
});

export {};
