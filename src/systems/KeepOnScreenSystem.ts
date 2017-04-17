import * as PIXI from 'pixi.js';

import { System } from './System';

export class KeepOnScreenSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['keepOnScreen']);

		for (let entity of entities) {
			if (entity.components.keepOnScreen) {
				if (entity.components.position.x < 0) {
					entity.components.position.x = 0;
				}
				if (entity.components.position.x > 800 - entity.components.draw.image.width) {
					entity.components.position.x = 800 - entity.components.draw.image.width;
				}
				if (entity.components.position.y < 0) {
					entity.components.position.y = 0;
				}
				if (entity.components.position.y > 600 - entity.components.draw.image.height) {
					entity.components.position.y = 600 - entity.components.draw.image.height;
				}
			}
		}
	};
}
