import * as PIXI from 'pixi.js';

import Game from './Game';
import { System } from './systems/System';
import { Entity } from './Entity';

export class GameManager {
	systems: Array<System>;
	entities: Array<Entity>;
	time: number;

	constructor() {
		this.entities = [];
		this.systems = [];
		this.time = 0;
	}

	public getEntitiesFilteredByComponents(componentNames: Array<string>) {
		let filteredEntities = {};
		return this.entities.filter(entity => {
			let matchingForComponents = 0;
			for (let componentName of componentNames) {
				if (entity.components[componentName]) {
					matchingForComponents++;
				}
			}
			if (matchingForComponents === componentNames.length) {
				return true;
			}
		})
	}

	public addEntity(entity: Entity) {
		this.entities.push(entity);
	}

	public removeEntity(deleteEntity: Entity) {
		deleteEntity.components.draw.container.destroy();
		this.entities = this.entities.filter(entity => entity.id !== deleteEntity.id);
	}

	public addSystem(system: System) {
		system.addToGameManager(this);
		this.systems.push(system);
	}

	public removeSystem(deleteSystem: System) {
		this.systems = this.systems.filter(system => system !== deleteSystem);
	}

	public update(delta: number): void {
		this.time += delta;
		for (let system of this.systems) {
			system.update(delta);
		}
	}
}
