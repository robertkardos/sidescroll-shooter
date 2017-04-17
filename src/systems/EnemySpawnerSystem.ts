import * as PIXI from 'pixi.js';

import { EntityCreator } from '../EntityCreator';
import { System } from './System';

export class EnemySpawnerSystem extends System {
	entityCreator: EntityCreator;
	timeToSpawnEnemy: number;
	timer: number;

	constructor(entityCreator: EntityCreator, timeToSpawnEnemy: number) {
		super();
		this.entityCreator = entityCreator;
		this.timeToSpawnEnemy = timeToSpawnEnemy;
		this.timer = 0;
	}

	update(delta: number): void {
		this.timer += delta;
		if (this.timer >= this.timeToSpawnEnemy) {
			this.timer = 0;
			this.entityCreator.createEnemy();
		}
	}
}
