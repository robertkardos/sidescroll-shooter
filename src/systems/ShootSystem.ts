import * as PIXI from 'pixi.js';

import { EntityCreator } from '../EntityCreator';
import { System } from './System';

export class ShootSystem extends System {
	entityCreator: EntityCreator;

	constructor(entityCreator: EntityCreator) {
		super();
		this.entityCreator = entityCreator;
	}

	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['shoot']);

		for (let entity of entities) {
			let shootComponent = entity.components.shoot;
			shootComponent.cooldownCounter -= delta;

			if (shootComponent.isShooting) {
				shootComponent.cooldownCounter = shootComponent.cooldown;
				shootComponent.isShooting = false;

				let position = new PIXI.Point(
					entity.components.position.x + entity.components.draw.image.width - 10,
					entity.components.position.y + entity.components.draw.image.height / 2
				);

				this.entityCreator.createRocket(position);
			}

		}
	};
}
