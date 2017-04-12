import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import Game from './Game';
import MovingGameObject from './MovingGameObject';
import Rocket from './Rocket';

export default class Ship extends MovingGameObject {
	public fallingVelocity: PIXI.Point;
	public explosion: Explosion;
	public explosionTimer: number;

	constructor(imageSrc: string) {
		super(imageSrc);

		this.fallingVelocity = new PIXI.Point(0);
		this.explosionTimer = 0;
	}

	public update(delta: number) {
		super.update(delta);
		if (this.state === 'exploding') {
			this.explodeAnimation(delta);
			if (this.explosion.alpha <= 0) {
				this.state = 'exploded';
			} else {
				this.explosion.update(delta);
			}
		}
	}

	protected move() {
		if (this.state === 'exploding') {
			this.velocity = this.fallingVelocity;
		}
		super.move();
	}

	public explode() {
		this.state = 'exploding';
		this.fallingVelocity.set(this.velocity.x, this.velocity.y);
		this.explosion = new Explosion(new PIXI.Point(0, 0), 100);
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
