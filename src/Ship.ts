import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import Game from './Game';
import GameObject from './GameObject';
import Rocket from './Rocket';

export default class Ship implements GameObject {
	public container: PIXI.Container;
	public velocity: PIXI.Point;
	public fallingVelocity: PIXI.Point;

	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;
	public status: string;

	public explosion: Explosion;
	public explosionTimer: number;

	constructor(imageSrc: string) {
		this.container = new PIXI.Container();
		this.status = 'live';

		this.texture = PIXI.Texture.fromImage(imageSrc);
		this.sprite = new PIXI.Sprite(this.texture);
		this.container.addChild(this.sprite);

		this.fallingVelocity = new PIXI.Point(0);
		this.explosionTimer = 0;
	}

	public update(delta: number) {
		if (this.status === 'exploding') {
			this.explodeAnimation(delta);
			if (this.explosion.alpha <= 0) {
				this.status = 'exploded';
			} else {
				this.explosion.update(delta);
			}
		}
		this.move();
	}

	private move() {
		if (this.status !== 'exploding') {
			this.container.x += this.velocity.x;
			this.container.y += this.velocity.y;
		} else {
			this.container.x += this.fallingVelocity.x;
			this.container.y += this.fallingVelocity.y;
		}
	}

	public explode() {
		this.status = 'exploding';
		this.fallingVelocity.set(this.velocity.x, this.velocity.y);
		this.explosion = new Explosion(new PIXI.Point(0, 0), 200);
		this.container.addChild(this.explosion);
		this.sprite.anchor.set(0.2, 0.2);
	}

	public explodeAnimation(delta: number) {
		this.sprite.rotation += 0.1;
		this.fallingVelocity.x = 0.98 * this.fallingVelocity.x;
		this.fallingVelocity.y = 0.98 * this.fallingVelocity.y;
		this.sprite.scale.set(this.explosion.alpha);
	}
}
