import { $ } from '../util/el';
import { TweenLite, Power2 } from 'gsap';

/**
 * Max width multiplier
 * @constant
 */
const MAX: number = 0.25;
/**
 * Width deviation
 * @constant
 */
const DVT: number = MAX / 2;
/**
 * Width padding, derived from border width
 * @constant
 */
const PAD: number = 15;
/**
 * Object colors
 * @constant
 */
const COLORS: string[] = [
  '#247BA0',
  '#70C1B3',
  '#B2DBBF',
  '#F3FFBD',
  '#FF1654'
];

let WINDOW_WIDTH: number;
let WINDOW_HEIGHT: number;
let SVG_EL: SVGElement;

/**
 * Load required environment variables
 * @function
 */
const initLoadedVars = (): void => {
  WINDOW_WIDTH = window.innerWidth;
  WINDOW_HEIGHT = window.innerHeight;
  SVG_EL = $('#tween-svg') as SVGElement;
  SVG_EL.style.width = `${WINDOW_WIDTH}px`;
  SVG_EL.style.height = `${WINDOW_HEIGHT}px`;
};

/**
 * Describes an SVG Object
 * @interface
 */
interface SVG {}

/**
 * Describes an SVG Shape
 * @abstract @class @implements SVG
 */
abstract class Shape implements SVG {
  public el: SVGElement;

  /**
   * Generates a random start differential for a new Shape
   * @protected @static @method
   */
  protected static getDifferential(): number {
    return Math.random() * WINDOW_WIDTH * MAX + WINDOW_WIDTH * DVT;
  }

  /**
   * Updates the Shape's color
   * @protected @method
   */
  protected updateColor(): this {
    this.el.setAttribute(
      'fill',
      COLORS[Math.floor(Math.random() * COLORS.length)]
    );
    return this;
  }
}

/**
 * Describes an SVG Blob
 * @class @extends Shape @implements SVG
 */
class Blob extends Shape implements SVG {
  private x0: number;
  private x1: number;
  private x2: number;
  private x3: number;
  private y0: number;
  private y1: number;
  private color: string;

  /**
   * Creates a Blob given some starting (x, y) coordinates
   * @constructs Shape
   */
  constructor(x: number, y: number) {
    super();
    this.x1 = Blob.getDifferential();
    this.x2 = this.x1 + Blob.getDifferential();
    this.x3 = this.x2 + Blob.getDifferential();
    this.x0 = x - this.x3 / 2;
    this.y0 = y;
    this.y1 = 0;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.updateColor()
      .updateEl()
      .animate();
  }

  /**
   * Dynamically updates Blob element path
   * @private @method
   */
  private updateEl(): this {
    this.el.setAttribute(
      'd',
      `M${this.x0},${this.y0} c${this.x1},${this.y1} ${this.x2},${this.y1} ${
        this.x3
      },0`
    );
    return this;
  }

  /**
   * Animate Blob movmement with GSAP
   * @private @method
   */
  private animate(): void {
    const __this = this;
    const time = 0.3 + Math.random() * 1.2;

    TweenLite.to(__this, time, {
      x1: Blob.getDifferential(),
      x2: __this.x1 + Blob.getDifferential(),
      x3: __this.x2 + Blob.getDifferential(),
      x0: WINDOW_WIDTH * MAX * 2 - __this.x3 / 2,
      y1: -WINDOW_HEIGHT * MAX * 1.5 * Math.random() - WINDOW_HEIGHT * MAX * 2,
      ease: Power2.easeInOut,
      onUpdate: (): Blob => __this.updateEl(),
      onComplete: (): void =>
        TweenLite.to(__this, time, {
          x1: Blob.getDifferential(),
          x2: __this.x1 + Blob.getDifferential(),
          x3: __this.x2 + Blob.getDifferential(),
          x0: WINDOW_WIDTH * MAX * 2 - __this.x3 / 2,
          y1: 0,
          onUpdate: (): Blob => __this.updateEl(),
          onComplete: (): void => {
            __this.animate();
            __this.updateColor();
          }
        })
    });
  }
}

/**
 * Describes an SVG Circle
 * @class @extends Shape @implements SVG
 */
class Circle extends Shape implements SVG {
  private radius: number;
  private x: number;
  private y: number;
  private opacity: number;

  /**
   * Stores all created Circles
   * @static
   */
  static circles: Circle[] = [];

  /**
   * Checks if a Circle intersects any existing Circles
   * @private @static @method
   */
  private static intersects(circle: Circle): boolean {
    for (let _circle of Circle.circles) {
      const distance = Math.sqrt(
        (_circle.x - circle.x) ** 2 + (_circle.y - circle.y) ** 2
      );
      if (distance <= _circle.radius + circle.radius) return true;
    }
    return false;
  }

  /**
   * Creates `n` Circles
   * @static @method
   */
  static make(amt: number): void {
    for (let i = 0; i < amt; ++i) {
      const circle = new Circle();

      if (!Circle.intersects(circle)) {
        Circle.circles.push(circle);
        circle
          .updateColor()
          .updateEl()
          .animate();
      } else {
        --i;
      }
    }
  }

  /**
   * Creates a Circle of random size and location
   * @constructs Circle
   */
  constructor() {
    super();
    this.radius =
      (Math.random() * WINDOW_WIDTH * 0.1 + WINDOW_WIDTH * 0.05) / 6;
    this.x =
      Math.random() * (WINDOW_WIDTH - 2 * this.radius - PAD * 2) +
      this.radius +
      PAD;
    this.y =
      Math.random() * (WINDOW_HEIGHT - 2 * this.radius - PAD * 2) +
      this.radius +
      PAD;
    this.opacity = 1;
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  }

  /**
   * Dynamically updates Circle element attributes
   * @private @method
   */
  private updateEl(): this {
    this.el.setAttribute('cx', `${this.x}`);
    this.el.setAttribute('cy', `${this.y}`);
    this.el.setAttribute('r', `${this.radius}`);
    this.el.style.opacity = `${this.opacity}`;
    return this;
  }

  /**
   * Animate Circle visibility with GSAP
   * @private @method
   */
  private animate(): void {
    const time = 0.3 + Math.random() * 2.4;

    TweenLite.to(this, time, {
      opacity: 1,
      ease: Power2.easeInOut,
      onUpdate: (): Circle => this.updateEl(),

      onComplete: (): void =>
        TweenLite.to(this, time, {
          opacity: 0,
          onUpdate: (): Circle => this.updateEl(),
          onComplete: (): void => {
            let circle;
            do {
              circle = new Circle();
            } while (Circle.intersects(circle));
            this.radius = circle.radius;
            this.x = circle.x;
            this.y = circle.y;
            this.opacity = circle.opacity;
            this.updateColor()
              .updateEl()
              .animate();
          }
        })
    });
  }
}

/**
 * Creates a Tween, which consists of an SVG Blob and `num` SVG Circles
 * @function
 */
const tween = (
  num: number,
  makeCircles: boolean = true,
  makeBlob: boolean = true
): void => {
  // redefine environment variables for document.load
  initLoadedVars();

  if (makeCircles) {
    Circle.make(num);
    Circle.circles.forEach(circle => SVG_EL.appendChild(circle.el));
  }

  if (makeBlob) {
    const blob = new Blob(WINDOW_WIDTH * 0.5, WINDOW_HEIGHT);
    SVG_EL.appendChild(blob.el);
  }
};

export { tween };
