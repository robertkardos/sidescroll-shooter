import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { System } from './System';
import { Vector } from '../util';

export class MovementSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['position', 'velocity']);

		for (let entity of entities) {
			if (entity.components.velocity && entity.components.position) {
				Vector.add(
					entity.components.position,
					entity.components.position,
					entity.components.velocity
				);
			}
		}
	};
}
