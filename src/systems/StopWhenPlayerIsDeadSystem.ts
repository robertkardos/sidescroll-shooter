import * as PIXI from 'pixi.js';

import { EntityCreator } from '../EntityCreator';
import { System } from './System';

export class StopWhenPlayerIsDeadSystem extends System {
	entityCreator: EntityCreator;

	constructor(entityCreator: EntityCreator) {
		super();
		this.entityCreator = entityCreator;
	}

	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['player']);
		let isPlayerAlive = false;

		if (entities.length !== 0) {
			isPlayerAlive = true;
		}

		if (!isPlayerAlive) {
			this.entityCreator.createScoreboard(this.gameManager.time);
			this.gameManager.removeSystem(this);
		}
	};
}
