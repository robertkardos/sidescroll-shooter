import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import GameObject from './GameObject';

export default class Rocket implements GameObject {
	public velocity: PIXI.Point;
	private texture: PIXI.Texture;
	public container: PIXI.Container;
	public sprite: PIXI.Sprite;
	public collided: boolean;

	constructor(position: PIXI.Point) {
		this.container = new PIXI.Container();
		this.velocity = new PIXI.Point(10);
		this.collided = false;
		this.texture = PIXI.Texture.fromImage('assets/rocket.png');
		this.sprite = new PIXI.Sprite(this.texture);
		position.y = position.y - this.sprite.height / 2;
		this.container.position = position;

		this.container.addChild(this.sprite);
	}

	public update() {
		this.container.position.x += this.velocity.x;
		if (this.container.position.x > 800 || this.collided) {
			this.container.destroy();
			return false;
		}
		return true;
	}

	public isCollidingWith(enemy: Enemy) {

	}
}
