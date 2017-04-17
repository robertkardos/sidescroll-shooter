import * as PIXI from 'pixi.js';

import { System } from './System';

export class DestroyWhenOffTheMapSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['DestroyWhenOffTheMap', 'position']);

		for (let entity of entities) {
			if (entity.components.position.x > 800 || entity.components.position.x + entity.components.draw.image.width < 0) {
				this.gameManager.removeEntity(entity);
			}
		}
	}
}
