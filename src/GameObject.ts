import * as PIXI from 'pixi.js';

import Vector from './util/Vector';

abstract class GameObject {
	public container: PIXI.Container;
	protected texture: PIXI.Texture;
	public sprite: PIXI.Sprite
	public isDisposable: boolean;
	public isCollidable: boolean;

	constructor(imageSrc: string) {
		this.container = new PIXI.Container();
		this.texture = PIXI.Texture.fromImage(imageSrc);
		this.sprite = new PIXI.Sprite(this.texture);
		this.isDisposable = false;
		this.isCollidable = true;

		this.container.addChild(this.sprite);
	}

	public remove() {
		this.isDisposable = true;
		this.container.parent.removeChild(this.container);
	}

	public abstract update(delta: number): void;

	public static areTheyColliding(object1: GameObject, object2: GameObject): boolean {
		let collision = false;

		let object1MiddlePoint = new PIXI.Point(
			object1.sprite.width / 2,
			object1.sprite.height / 2
		);
		let object1MiddleCoord = Vector.add(
			new PIXI.Point(),
			object1.container.position,
			object1MiddlePoint
		);

		let object2MiddlePoint = new PIXI.Point(
			object2.sprite.width / 2,
			object2.sprite.height / 2
		);
		let object2MiddleCoord = Vector.add(
			new PIXI.Point(),
			object2.container.position,
			object2MiddlePoint
		);

		let distanceOnX = Math.abs(object1MiddleCoord.x - object2MiddleCoord.x);
		let distanceOnY = Math.abs(object1MiddleCoord.y - object2MiddleCoord.y);

		let minimumDistanceOnX = (object1.sprite.width + object2.sprite.width) / 2;
		let minimumDistanceOnY = (object1.sprite.height + object2.sprite.height) / 2;

		if (distanceOnX < minimumDistanceOnX && distanceOnY < minimumDistanceOnY) {
			collision = true;
		}

		return collision;
	};
}

export default GameObject;
