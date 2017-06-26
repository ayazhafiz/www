import { TweenLite } from 'gsap';

const MAX = 0.25;
const DVT = MAX / 2;
const PAD = 15;

let colors = ['#247BA0', '#70C1B3', '#B2DBBF', '#F3FFBD', '#FF1654'],
    circles = [],
    windowWidth, windowHeight, svgEl;

let initLoadedVars = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    svgEl = document.getElementById('tween-svg');
    svgEl.style.width = windowWidth;
    svgEl.style.height = windowHeight;
}

class ShapeUtil {
  static getDifferential() {
    return Math.random() * windowWidth * MAX + windowWidth * DVT;
  }

  static intersects(circle) {
  	for (let j = 0; j < circles.length; j++) {
  		let distance = Math.sqrt(
  			Math.pow(circles[j].x - circle.x, 2) +
  			Math.pow(circles[j].y - circle.y, 2)
  		);
  		if (distance <= circles[j].radius + circle.radius)
  			return true;
  	}
  	return false;
  };
}

class Blob {
	constructor(x, y) {
		this.x1 = ShapeUtil.getDifferential();
		this.x2 = this.x1 + ShapeUtil.getDifferential();
		this.x3 = this.x2 + ShapeUtil.getDifferential();
		this.x0 = x - this.x3 / 2;
		this.y0 = y;
		this.y1 = 0;
		this.color = '#247BA0';
		this.pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	}

	updatePath() {
		this.pathEl.setAttribute('d', `M${this.x0},${this.y0} c${this.x1},${this.y1} ${this.x2},${this.y1} ${this.x3},0`);
	}

	updateColor() {
		this.pathEl.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
	}

	animate() {
		var _this = this;
		var time = 0.3 + Math.random() * 1.2;

		TweenLite.to(_this, time, {
			x1: ShapeUtil.getDifferential(),
			x2: _this.x1 + ShapeUtil.getDifferential(),
			x3: _this.x2 + ShapeUtil.getDifferential(),
			x0: windowWidth * MAX * 2 - _this.x3 / 2,
			y1: -windowHeight * MAX * 1.5 * Math.random() - windowHeight * MAX * 2,
			ease: Power2.easeInOut,
			onUpdate: () => _this.updatePath(),

			onComplete: () => TweenLite.to(_this, time, {
				x1: ShapeUtil.getDifferential(),
				x2: _this.x1 + ShapeUtil.getDifferential(),
				x3: _this.x2 + ShapeUtil.getDifferential(),
				x0: windowWidth * MAX * 2 - _this.x3 / 2,
				y1: 0,
				onUpdate: () => _this.updatePath(),
				onComplete: () => {
					_this.animate();
					_this.updateColor();
				}
			})
		});
	}
}

class Circle {
	constructor() {
		this.radius = (Math.random() * windowWidth * 0.1 + windowWidth * 0.05) / 6;
		this.x = Math.random() * (windowWidth - 2 * this.radius - PAD * 2) + this.radius + PAD;
		this.y = Math.random() * (windowHeight - 2 * this.radius - PAD * 2) + this.radius + PAD;
		this.opacity = 1;
		this.circleEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	}

	updateCircle() {
		this.circleEl.setAttribute('cx', this.x);
		this.circleEl.setAttribute('cy', this.y);
		this.circleEl.setAttribute('r', this.radius);
		this.circleEl.style.opacity = this.opacity;
	}

	updateColor() {
		this.circleEl.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
	}

	animate() {
		var _this = this;
		var time = 0.3 + Math.random() * 2.4;

		TweenLite.to(_this, time, {
			opacity: 1,
			ease: Power2.easeInOut,
			onUpdate: () => _this.updateCircle(),

			onComplete: () => TweenLite.to(_this, time, {
				opacity: 0,
				onUpdate: () => _this.updateCircle(),
				onComplete: () => {
					_this.animate();
					_this.updateColor();
				}
			})
		});
	}
}

export default function() {
  initLoadedVars();

  // create 20 circles
	for (let i = 0; i < 20; i++) {

		let circle = new Circle();
    let overlapping = false;

		if (!ShapeUtil.intersects(circle)) {
			circles.push(circle);
			svgEl.appendChild(circle.circleEl);
			circle.updateCircle();
			circle.updateColor();

			circle.animate();
		} else {
			i--;
		}
	}

  // create a blob
	let blob = new Blob(windowWidth * 0.5, windowHeight);
	svgEl.appendChild(blob.pathEl);
	blob.updatePath();
	blob.updateColor();

	blob.animate();
};