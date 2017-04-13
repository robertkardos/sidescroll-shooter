import * as PIXI from 'pixi.js';

import Explosion from './Explosion';
import MovingGameObject from './MovingGameObject';
import Ship from './Ship';
import ShipState from './ShipState';
import ShipExplodingState from './ShipExplodingState';

export default class ShipLiveState implements ShipState {
	public update(this: Ship, delta: number) {
		this.loseMomentum();
	}

	public go(this: Ship, direction: string, directions: {}, acceleration: PIXI.Point) {
		this.velocity.x += directions[direction].x * acceleration.x;
		this.velocity.y += directions[direction].y * acceleration.y;
	}

	public explode(this: Ship) {
		// this.fallingVelocity.set(this.velocity.x, this.velocity.y);
		this.explosion = new Explosion(new PIXI.Point(0, 0));
		this.container.addChild(this.explosion);
		this.sprite.anchor.set(0.3, 0.4);
		this.shipState = new ShipExplodingState();
	}
}
