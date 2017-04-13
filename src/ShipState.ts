import * as PIXI from 'pixi.js';

import MovingGameObject from './MovingGameObject';
import Ship from './Ship';

interface ShipState {
	update(this: Ship, delta: number): void;
	go(direction: string, directions: {}, acceleration: PIXI.Point): void;
	explode(this: Ship): void;
}

export default ShipState;
