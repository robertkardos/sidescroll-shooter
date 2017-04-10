import * as PIXI from 'pixi.js';

export default class Ship extends PIXI.Graphics {
	public velocity: PIXI.Point;
	private graphics: PIXI.Graphics;

	constructor(
		position: PIXI.Point,
		velocity: PIXI.Point = new PIXI.Point(0)
	) {
		super();

		this.lineStyle(2, +0xff381f, 1);
		this.beginFill(0xFFf99B, 1);
		this.drawRect(
			position.x + 20,
			position.y + 20,
			8,
			8
		);

		let xRandomRange = (Math.random() - 0.5) * 5 + velocity.x / 2;
		let yRandomRange = (Math.random() - 0.5) * 2 + velocity.y / 2;

		this.velocity = new PIXI.Point(
			xRandomRange,
			yRandomRange
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
