import * as PIXI from 'pixi.js';

export default class Util {
	private constructor() {}

	public static areTheyColliding(r1: any, r2: any) {

		let collision = false;

		let r1MiddlePoint = new PIXI.Point(
			r1.sprite.position.x + (r1.sprite.width / 2),
			r1.sprite.position.y + (r1.sprite.height / 2)
		);

		let r2MiddlePoint = new PIXI.Point(
			r2.sprite.position.x + (r2.sprite.width / 2),
			r2.sprite.position.y + (r2.sprite.height / 2)
		);

		let distanceOnX = Math.abs(r1MiddlePoint.x - r2MiddlePoint.x);
		let distanceOnY = Math.abs(r1MiddlePoint.y - r2MiddlePoint.y);

		let minimumDistanceOnX = (r1.sprite.width + r2.sprite.width) / 2;
		let minimumDistanceOnY = (r1.sprite.height + r2.sprite.height) / 2;


		if (distanceOnX < minimumDistanceOnX && distanceOnY < minimumDistanceOnY) {
			collision = true;
		}

		return collision;
	};
}
