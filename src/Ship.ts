import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import Game from './Game';
import MovingGameObject from './MovingGameObject';
import Rocket from './Rocket';

import ShipLiveState from './ShipLiveState';
import ShipExplodingState from './ShipExplodingState';
import ShipState from './ShipState';
import Vector from './util/Vector';

export default class Ship extends MovingGameObject {
	public explosion: Explosion;
	public shipState: ShipState;
	protected directions: {};
	protected acceleration: PIXI.Point;
	protected rateOfLosingMomentum: number;

	constructor(imageSrc: string) {
		super(imageSrc);
		this.shipState = new ShipLiveState();

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
		this.velocity = Vector.scale(
			new PIXI.Point(),
			this.velocity,
			this.rateOfLosingMomentum
		);
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

		this.velocity = Vector.scale(new PIXI.Point(), this.velocity, 0.97);
		this.sprite.scale = Vector.scale(new PIXI.Point(), this.sprite.scale, 0.98);
		this.sprite.alpha = this.explosion.alpha;
	}
}
