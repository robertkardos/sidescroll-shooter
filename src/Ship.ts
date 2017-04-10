import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import Game from './Game';
import GameObject from './GameObject';
import Rocket from './Rocket';

export default class Ship implements GameObject {
	public container: PIXI.Container;
	public velocity: PIXI.Point;

	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;

	public collided: boolean;
	public exploded: boolean;
	public explosion: Explosion;
	public explosionTimer: number;

	constructor(imageSrc: string) {
		this.container = new PIXI.Container();

		this.texture = PIXI.Texture.fromImage(imageSrc);
		this.sprite = new PIXI.Sprite(this.texture);
		this.container.addChild(this.sprite);

		this.exploded = false;
		this.explosionTimer = 0;
	}

	public update(delta: number) {
		if (this.collided) {
			let isStillExploding = this.explosion.update(delta);
			if (isStillExploding) {
				console.log('destroyed')
				this.container.destroy();
				return false;
			}
		}
		this.container.x += this.velocity.x;
		this.container.y += this.velocity.y;
		return true;
	}

	public explode() {
		this.collided = true;
		this.explosion = new Explosion(new PIXI.Point(this.container.x, this.container.y), 200);
		this.container.addChild(this.explosion);
	}
}
