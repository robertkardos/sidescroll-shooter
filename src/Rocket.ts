import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';

export default class Rocket extends PIXI.DisplayObject {
	public velocity: number;
	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;
	public collided: boolean;

	constructor(position: PIXI.Point) {
		super();
		this.velocity = 10;
		this.collided = false;
		this.texture = PIXI.Texture.fromImage('assets/rocket.png');
		this.sprite = new PIXI.Sprite(this.texture);
		position.y = position.y - this.sprite.height / 2;
		this.sprite.position = position;
	}

	public update(): boolean {
		this.sprite.position.x += this.velocity;
		if (this.sprite.position.x > 800 || this.collided) {
			this.sprite.destroy();
			return false;
		}
		return true;
	}

	public isCollidingWith(enemy: Enemy) {

	}
}
