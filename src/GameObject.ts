import * as PIXI from 'pixi.js';

abstract class GameObject {
	public container: PIXI.Container;
	protected texture: PIXI.Texture;
	public sprite: PIXI.Sprite
	public state: string;

	constructor(imageSrc: string) {
		this.container = new PIXI.Container();
		this.texture = PIXI.Texture.fromImage(imageSrc);
		this.sprite = new PIXI.Sprite(this.texture);
		this.state = 'live';

		this.container.addChild(this.sprite);
	}

	public abstract update(delta: number): void;

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
