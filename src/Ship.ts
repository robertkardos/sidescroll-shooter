import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import Game from './Game';
import MovingGameObject from './MovingGameObject';
import Rocket from './Rocket';

import ShipLiveState from './ShipLiveState';
import ShipExplodingState from './ShipExplodingState';
import ShipState from './ShipState';

export default class Ship extends MovingGameObject {
	public fallingVelocity: PIXI.Point;
	public explosion: Explosion;
	public explosionTimer: number;
	public shipState: ShipState;
	protected directions: {};
	protected acceleration: PIXI.Point;
	protected rateOfLosingMomentum: number;

	constructor(imageSrc: string) {
		super(imageSrc);
		this.shipState = new ShipLiveState();

		this.fallingVelocity = new PIXI.Point(0);
		this.explosionTimer = 0;

		this.directions = {
			up: new PIXI.Point(0, -1),
			right: new PIXI.Point(1, 0),
			down: new PIXI.Point(0, 1),
			left: new PIXI.Point(-1, 0)
		};
	}

	public update(delta: number) {
		super.update(delta);
		this.shipState.update.call(this, delta);
	}

	public loseMomentum() {
		this.velocity.x = this.velocity.x * this.rateOfLosingMomentum;
		this.velocity.y = this.velocity.y * this.rateOfLosingMomentum;
	}

	public go(direction: string) {
		this.shipState.go.call(this, direction, this.directions, this.acceleration);
	}

	public explode() {
		this.isCollidable = false;
		this.shipState.explode.call(this);
	}

	public explodeAnimation(delta: number) {
		this.explosion.update(delta);
		if (this.explosion.alpha <= 0) {
			this.isDisposable = true;
		}
		this.sprite.rotation += 0.05;
		this.velocity.x = 0.97 * this.velocity.x;
		this.velocity.y = 0.97 * this.velocity.y;
		this.sprite.scale.set(this.explosion.alpha);
	}
}
