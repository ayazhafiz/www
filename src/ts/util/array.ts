declare global {
  interface Array<T> {
    max: T;
    min: T;
    range;
  }
}
/**
 * Finds the maximum value of an array
 * @extends Array
 */
Array.prototype.max = function(): number {
  return Math.max.apply(null, this);
};

/**
 * Finds the minimum value of an array
 * @extends Array
 */
Array.prototype.min = function(): number {
  return Math.min.apply(null, this);
};

/**
 * Generates an Array of a numeric range
 * @extends Array
 */
Array.prototype.range = function(): number[] {
  return Array.from(
    new Array(this.max() - this.min() + 1),
    (n, i) => this.min() + i
  );
};

export {};