import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { EntityCreator } from '../EntityCreator';
import { System } from './System';
import { Vector } from '../util';

export class CollisionSystem extends System {
	entityCreator: EntityCreator;

	constructor(entityCreator: EntityCreator) {
		super();
		this.entityCreator = entityCreator;
	}

	update(delta: number): void {
		let entities = this.gameManager.getEntitiesFilteredByComponents(['collision']);

		for (let entity1 of entities) {
			if (entity1.components.collision.group === 1) {
				for (let entity2 of entities) {
					if (
						entity1.id !== entity2.id &&
						this.areTheyColliding(entity1, entity2) &&
						entity1.components.collision.group !== entity2.components.collision.group
					) {
						if (entity1.components.explosive) {
							this.entityCreator.createParticles(50, {x: entity1.components.position.x, y: entity1.components.position.y});
						}
						if (entity2.components.explosive) {
							this.entityCreator.createParticles(50, {x: entity2.components.position.x, y: entity2.components.position.y});
						}
						this.gameManager.removeEntity(entity1);
						this.gameManager.removeEntity(entity2);
					}
				}
			}
		}
	};

	private areTheyColliding(object1: Entity, object2: Entity): boolean {
		let collision = false;

		let object1MiddlePoint = new PIXI.Point(
			object1.components.draw.image.width / 2,
			object1.components.draw.image.height / 2
		);
		let object1MiddleCoord = Vector.add(
			new PIXI.Point(),
			object1.components.position,
			object1MiddlePoint
		);

		let object2MiddlePoint = new PIXI.Point(
			object2.components.draw.image.width / 2,
			object2.components.draw.image.height / 2
		);
		let object2MiddleCoord = Vector.add(
			new PIXI.Point(),
			object2.components.position,
			object2MiddlePoint
		);

		let distanceOnX = Math.abs(object1MiddleCoord.x - object2MiddleCoord.x);
		let distanceOnY = Math.abs(object1MiddleCoord.y - object2MiddleCoord.y);

		let minimumDistanceOnX = (object1.components.draw.image.width + object2.components.draw.image.width) / 2;
		let minimumDistanceOnY = (object1.components.draw.image.height + object2.components.draw.image.height) / 2;

		if (distanceOnX < minimumDistanceOnX && distanceOnY < minimumDistanceOnY) {
			collision = true;
		}

		return collision;
	};
}
