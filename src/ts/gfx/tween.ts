import { TweenLite, Power2 } from 'gsap';

const $$MAX = 0.25;
const $$DVT = $$MAX / 2;
const $$PAD = 15; // padding derived from border width
const $$COLORS = ['#247BA0', '#70C1B3', '#B2DBBF', '#F3FFBD', '#FF1654'];

let $$WINDOW_WIDTH;
let $$WINDOW_HEIGHT;
let $$SVG_EL;

const initLoadedVars = (): void => {
  $$WINDOW_WIDTH = window.innerWidth;
  $$WINDOW_HEIGHT = window.innerHeight;
  $$SVG_EL = document.getElementById('tween-svg');
  $$SVG_EL.style.width = $$WINDOW_WIDTH;
  $$SVG_EL.style.height = $$WINDOW_HEIGHT;
};

interface SVG {}

abstract class Shape implements SVG {
  public el: SVGElement;

  // generates a random start differential
  protected static getDifferential(): number {
    return Math.random() * $$WINDOW_WIDTH * $$MAX + $$WINDOW_WIDTH * $$DVT;
  }

  protected updateColor(): this {
    this.el.setAttribute(
      'fill',
      $$COLORS[Math.floor(Math.random() * $$COLORS.length)]
    );
    return this;
  }
}

class Blob extends Shape implements SVG {
  private x1: number;
  private x2: number;
  private x3: number;
  private x0: number;
  private y0: number;
  private y1: number;
  private color: string;

  // create a blob given some starting (x, y) coordinates
  constructor(x: number, y: number) {
    super();
    this.x1 = Blob.getDifferential();
    this.x2 = this.x1 + Blob.getDifferential();
    this.x3 = this.x2 + Blob.getDifferential();
    this.x0 = x - this.x3 / 2;
    this.y0 = y;
    this.y1 = 0;
    this.color = $$COLORS[Math.floor(Math.random() * $$COLORS.length)];
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.updateColor().updateEl().animate();
  }

  // dynamically update blob element path
  private updateEl(): this {
    this.el.setAttribute(
      'd',
      `M${this.x0},${this.y0} c${this.x1},${this.y1} ${this.x2},${this
        .y1} ${this.x3},0`
    );
    return this;
  }

  // animate blob movmement with GSAP
  private animate(): void {
    const __this = this;
    const time = 0.3 + Math.random() * 1.2;

    TweenLite.to(__this, time, {
      x1: Blob.getDifferential(),
      x2: __this.x1 + Blob.getDifferential(),
      x3: __this.x2 + Blob.getDifferential(),
      x0: $$WINDOW_WIDTH * $$MAX * 2 - __this.x3 / 2,
      y1:
        -$$WINDOW_HEIGHT * $$MAX * 1.5 * Math.random() -
        $$WINDOW_HEIGHT * $$MAX * 2,
      ease: Power2.easeInOut,
      onUpdate: (): Blob => __this.updateEl(),
      onComplete: (): void =>
        TweenLite.to(__this, time, {
          x1: Blob.getDifferential(),
          x2: __this.x1 + Blob.getDifferential(),
          x3: __this.x2 + Blob.getDifferential(),
          x0: $$WINDOW_WIDTH * $$MAX * 2 - __this.x3 / 2,
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

class Circle extends Shape implements SVG {
  private radius: number;
  private x: number;
  private y: number;
  private opacity: number;

  static circles: Array<Circle> = [];

  // checks if a given circle intersects any existing circles
  private static intersects(circle: Circle): boolean {
    for (let _circle of Circle.circles) {
      const distance = Math.sqrt(
        (_circle.x - circle.x) ** 2 + (_circle.y - circle.y) ** 2
      );
      if (distance <= _circle.radius + circle.radius) return true;
    }
    return false;
  }

  static make(amt: number) {
    for (let i = 0; i < amt; ++i) {
      const circle = new Circle();

      if (!Circle.intersects(circle)) {
        Circle.circles.push(circle);
        circle.updateColor().updateEl().animate();
      } else {
        --i;
      }
    }
  }

  // construct a random circle with boundary definitions
  constructor() {
    super();
    this.radius =
      (Math.random() * $$WINDOW_WIDTH * 0.1 + $$WINDOW_WIDTH * 0.05) / 6;
    this.x =
      Math.random() * ($$WINDOW_WIDTH - 2 * this.radius - $$PAD * 2) +
      this.radius +
      $$PAD;
    this.y =
      Math.random() * ($$WINDOW_HEIGHT - 2 * this.radius - $$PAD * 2) +
      this.radius +
      $$PAD;
    this.opacity = 1;
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  }

  // dynamically update circle element attributes
  private updateEl(): this {
    this.el.setAttribute('cx', `${this.x}`);
    this.el.setAttribute('cy', `${this.y}`);
    this.el.setAttribute('r', `${this.radius}`);
    this.el.style.opacity = `${this.opacity}`;
    return this;
  }

  // animate circle visibility with GSAP
  private animate() {
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
            this.updateColor().updateEl().animate();
          }
        })
    });
  }
}

const tween = (
  num: number,
  makeCircles: boolean = true,
  makeBlob: boolean = true
): void => {
  // redefine environment variables for document.load
  initLoadedVars();

  if (makeCircles) {
    Circle.make(num);
    Circle.circles.forEach(circle => $$SVG_EL.appendChild(circle.el));
  }

  if (makeBlob) {
    const blob = new Blob($$WINDOW_WIDTH * 0.5, $$WINDOW_HEIGHT);
    $$SVG_EL.appendChild(blob.el);
  }
};

export { tween };
