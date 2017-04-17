import * as PIXI from 'pixi.js';

import { System } from './System';
import { Components } from '../components';
import { Vector } from '../util';

export class MomentumSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['velocity', 'momentum']);

		for (let entity of entities) {
			Vector.scale(entity.components.velocity, entity.components.velocity, entity.components.momentum.rateOfLosingMomentum);
		}
	}
}
