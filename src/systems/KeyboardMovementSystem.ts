import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { System } from './System';
import { VelocityComponent } from '../components/VelocityComponent';
import { Vector } from '../util';

export class KeyboardMovementSystem extends System {
	pressedKeys: Array<boolean>;
	directions: {
		[key: string]: PIXI.Point
	};

	constructor(pressedKeys: Array<boolean>) {
		super();
		this.pressedKeys = pressedKeys;
		this.directions = {
			up: new PIXI.Point(0, -1),
			right: new PIXI.Point(1, 0),
			down: new PIXI.Point(0, 1),
			left: new PIXI.Point(-1, 0)
		};
	}

	update(delta: number): void {
		let entitiesCanShoot = this.gameManager.getEntitiesFilteredByComponents(['KeyboardMovement', 'acceleration']);
		let entitiesCanAccelerate = this.gameManager.getEntitiesFilteredByComponents(['KeyboardMovement', 'acceleration']);

		for (let entity of entitiesCanShoot) {
			if (this.pressedKeys[32]) {
				if (entity.components.shoot.cooldownCounter <= 0) {
					entity.components.shoot.isShooting = true;
				}
			}
		}

		for (let entity of entitiesCanAccelerate) {
			let direction;

			if (this.pressedKeys[87]) {
				this.accelerate(entity, 'up');
			}
			if (this.pressedKeys[68]) {
				this.accelerate(entity, 'right');
			}
			if (this.pressedKeys[83]) {
				this.accelerate(entity, 'down');
			}
			if (this.pressedKeys[65]) {
				this.accelerate(entity, 'left');
			}
		}
	}

	accelerate(entity: Entity, direction: string) {
		let velocityComponent = Vector.add(
			new VelocityComponent(0, 0),
			entity.components.velocity,
			new VelocityComponent(
				this.directions[direction].x * entity.components.acceleration.x,
				this.directions[direction].y * entity.components.acceleration.y
			)
		);

		entity.components.velocity = velocityComponent;
	}
}
