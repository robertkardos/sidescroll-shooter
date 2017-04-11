import * as PIXI from 'pixi.js';

abstract class GameObject {
	public container: PIXI.Container;
	public velocity: PIXI.Point;
	public status: string;
	public sprite: PIXI.Sprite

	abstract update: (delta: number) => void;

	public static areTheyColliding(object1: GameObject, object2: GameObject): boolean {

		let collision = false;

		let object1MiddlePoint = new PIXI.Point(
			object1.container.x + (object1.sprite.width / 2),
			object1.container.y + (object1.sprite.height / 2)
		);

		let object2MiddlePoint = new PIXI.Point(
			object2.container.x + (object2.sprite.width / 2),
			object2.container.y + (object2.sprite.height / 2)
		);

		let distanceOnX = Math.abs(object1MiddlePoint.x - object2MiddlePoint.x);
		let distanceOnY = Math.abs(object1MiddlePoint.y - object2MiddlePoint.y);

		let minimumDistanceOnX = (object1.sprite.width + object2.sprite.width) / 2;
		let minimumDistanceOnY = (object1.sprite.height + object2.sprite.height) / 2;


		if (distanceOnX < minimumDistanceOnX && distanceOnY < minimumDistanceOnY) {
			collision = true;
		}

		return collision;
	};
}

export default GameObject;
