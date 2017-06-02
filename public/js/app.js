let colors = ['#247BA0', '#70C1B3', '#B2DBBF', '#F3FFBD', '#FF1654'],
	w = window.innerWidth,
	h = window.innerHeight,
	circles = [];
const svgT = document.getElementById('svg');

svgT.style.width = w;
svgT.style.height = h;

class Blob {
	constructor(x, y) {
		this.x1 = Math.random() * w * 0.25 + w * 0.125;
		this.x2 = this.x1 + Math.random() * w * 0.25 + w * 0.125;
		this.x3 = this.x2 + Math.random() * w * 0.25 + w * 0.125;
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
			x1: Math.random() * w * 0.25 + w * 0.125,
			x2: _this.x1 + Math.random() * w * 0.25 + w * 0.125,
			x3: _this.x2 + Math.random() * w * 0.25 + w * 0.125,
			x0: w * 0.5 - _this.x3 / 2,
			y1: -h * 0.75 * Math.random() - h * 0.5,
			ease: Power2.easeInOut,
			onUpdate: () => _this.updatePath(),

			onComplete: () => TweenLite.to(_this, time, {
				x1: Math.random() * w * 0.25 + w * 0.125,
				x2: _this.x1 + Math.random() * w * 0.25 + w * 0.125,
				x3: _this.x2 + Math.random() * w * 0.25 + w * 0.125,
				x0: w * 0.5 - _this.x3 / 2,
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
		this.radius = (Math.random() * w * 0.1 + w * 0.05) / 6;
		this.x = Math.random() * (w - 2 * this.radius - 30) + this.radius + 15;
		this.y = Math.random() * (h - 2 * this.radius - 30) + this.radius + 15;
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

let intersects = circle => {
	for (let j = 0; j < circles.length; j++) {
		let distance = Math.sqrt(
			Math.pow(circles[j].x - circle.x, 2) +
			Math.pow(circles[j].y - circle.y, 2)
		);
		if (distance <= circles[j].radius + circle.radius)
			return true;
	}
	return false;
}

(function() {
	for (let i = 0; i < 20; i++) {

		var circle = new Circle(),
			overlapping = false

		if (!intersects(circle)) {
			circles.push(circle);
			svgT.appendChild(circle.circleEl);
			circle.updateCircle();
			circle.updateColor();

			circle.animate();
		} else i--;
	}

	var blob = new Blob(w * 0.5, h);
	svgT.appendChild(blob.pathEl);
	blob.updatePath();
	blob.updateColor();

	blob.animate();
})();


!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/Windows Phone/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");if("undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

document.querySelector('.octicon').classList.add(isMobile.any ? 'octicon-device-mobile' : 'octicon-device-desktop');
document.querySelector('.social').innerHTML += ( isMobile.any ?
												`<span style="padding-right:5%">{first}.{last}.1@gmail.com</span><a class="twitter" style="padding-left:5%;" href="https://twitter.com/dvmvnds" target="_blank">@dvmvnds</a>` :
												`<div style="width:50%;float:left;text-align:right">
													<span style="padding-right:5%">{first}.{last}.1@gmail.com</span>
												</div>
												<div style="width:50%;float:left;text-align:left">
													<a class="twitter" style="padding-left:5%;" href="https://twitter.com/dvmvnds" target="_blank">@dvmvnds</a>
												</div>`);
if (isMobile.any) document.querySelector('.mouse').classList.add('touch');
if (!isMobile.any) document.querySelector('.forall').style.fontSize = '1.2em';