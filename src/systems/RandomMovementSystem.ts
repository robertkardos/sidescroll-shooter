import * as PIXI from 'pixi.js';

import { System } from './System';

export class RandomMovementSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['randomMovement']);

		for (let entity of entities) {
			entity.components.velocity.x = entity.components.randomMovement.velocityOnX;
			entity.components.velocity.y = Math.cos(entity.components.position.x / entity.components.randomMovement.movementPeriod) * entity.components.randomMovement.velocityOnY;
		}
	};
}
