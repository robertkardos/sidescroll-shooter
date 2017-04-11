import * as PIXI from 'pixi.js';

export default class Particle extends PIXI.Graphics {
	public velocity: PIXI.Point;

	constructor(
		velocity: PIXI.Point = new PIXI.Point(0)
	) {
		super();
		let direction = Math.random() * 2 * Math.PI;
		let velocityScale = Math.random();
		let size = 5;
		// let size = Math.round(Math.random() * 5) + 3;
		let colors = [
			0xffffff,
			0xfffe00,
			0xff8206,
			0xfb0000,
			0xa70103
		];

		let colorBasedOnVelocity = colors[Math.floor(velocityScale / 0.2)];
		this.lineStyle(1, 0x000000, 1);
		this.beginFill(colorBasedOnVelocity, 1);
		this.drawRect(0, 0, size, size);

		this.velocity = new PIXI.Point(
			Math.cos(direction) * velocityScale,
			Math.sin(direction) * velocityScale
		);
	}

	public update(delta: number) {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.alpha -= 0.01;
		if (this.alpha === 0) {
			this.destroy();
			return false;
		}
		return true;
	}
}
