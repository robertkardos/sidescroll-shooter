import * as PIXI from 'pixi.js';

import { System } from './System';

export class DrawSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['draw', 'position']);

		for (let entity of entities) {
			entity.components.draw.container.position.x = entity.components.position.x;
			entity.components.draw.container.position.y = entity.components.position.y;
		}
	}
}
