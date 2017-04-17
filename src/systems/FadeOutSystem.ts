import * as PIXI from 'pixi.js';

import { System } from './System';

export class FadeOutSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['fadeOut', 'draw']);

		for (let entity of entities) {
			entity.components.fadeOut.alpha -= 0.01;
			entity.components.draw.container.alpha = entity.components.fadeOut.alpha;
			if (entity.components.fadeOut.alpha <= 0) {
				this.gameManager.removeEntity(entity);
			}
		}
	}
}
