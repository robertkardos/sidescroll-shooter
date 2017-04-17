import * as PIXI from 'pixi.js';

import { System } from './System';
import { Vector } from '../util';

export class ScrollSystem extends System {
	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['draw', 'scroll']);

		for (let entity of entities) {
			entity.components.draw.image.tilePosition = Vector.add(
				new PIXI.Point(),
				entity.components.draw.image.tilePosition,
				entity.components.scroll
			);
		}
	};
}
