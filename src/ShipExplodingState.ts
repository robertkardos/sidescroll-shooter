import * as PIXI from 'pixi.js';

import ShipState from './ShipState';
import ShipLiveState from './ShipLiveState';
import Ship from './Ship';

export default class ShipExplodingState implements ShipState {
	public update(this: Ship, delta: number) {
		this.explodeAnimation(delta);
	}

	public go(direction: string, directions: {}, acceleration: PIXI.Point) {}

	public explode(this: Ship) {}
}
