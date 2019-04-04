declare global {
  interface Array<T> {
    max(): T;
    min(): T;
    range(): T[];
    flat(): T[];
  }
}
/**
 * Finds the maximum value of an array
 * @extends Array
 */
Array.prototype.max = function(this: number[]): number {
  return Math.max.apply(null, this);
};

/**
 * Finds the minimum value of an array
 * @extends Array
 */
Array.prototype.min = function(this: number[]): number {
  return Math.min.apply(null, this);
};

/**
 * Generates an Array of a numeric range
 * @extends Array
 */
Array.prototype.range = function(this: number[]): number[] {
  return Array.from(
    new Array(this.max() - this.min() + 1),
    (_, i) => this.min() + i,
  );
};

/**
 * Flattens an array
 * @extends Array
 */
Array.prototype.flat = function(this: any[]): any[] {
  return this.reduce((a, b) => a.concat(Array.isArray(b) ? b.flat() : b), []);
};

export {};
