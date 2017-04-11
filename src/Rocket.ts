import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import GameObject from './GameObject';

export default class Rocket implements GameObject {
	public container: PIXI.Container;
	public velocity: PIXI.Point;
	public status: string;

	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;

	constructor(position: PIXI.Point) {
		this.container = new PIXI.Container();
		this.velocity = new PIXI.Point(10);
		this.status = 'live';

		this.texture = PIXI.Texture.fromImage('assets/rocket.png');
		this.sprite = new PIXI.Sprite(this.texture);
		position.y = position.y - this.sprite.height / 2;
		this.container.position = position;

		this.container.addChild(this.sprite);
	}

	public update(delta: number) {
		this.container.position.x += this.velocity.x;
		if (this.container.position.x > 800) {
			this.status = 'left';
		}
	}
}
