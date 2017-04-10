import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import Game from './Game';
import Rocket from './Rocket';

export default class Ship extends PIXI.Container {
	public velocity: PIXI.Point;
	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;
	public collided: boolean;
	public exploded: boolean;
	public explosion: Explosion;
	public explosionTimer: number;

	constructor(imageSrc: string) {
		super();
		this.exploded = false;
		this.texture = PIXI.Texture.fromImage(imageSrc);
		this.sprite = new PIXI.Sprite(this.texture);
		this.addChild(this.sprite);
		this.explosionTimer = 0;
	}

	public update(delta: number) {
		if (this.collided) {
			let isStillExploding = this.explosion.update(delta);
			if (isStillExploding) {
				console.log('destroyed')
				this.destroy();
				return false;
			}
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		return true;
	}

	public explode() {
		this.collided = true;
		this.explosion = new Explosion(new PIXI.Point(this.x, this.y), 200);
		this.addChild(this.explosion);
	}
}
