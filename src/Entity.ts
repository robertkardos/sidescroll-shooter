import * as PIXI from 'pixi.js';

import { Component } from './components/Component';
import { GameManager } from './GameManager';

export class Entity {
	id: string;
	components: {
		[key: string]: any
	};

	constructor() {
		this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
		this.components = {};
	}

	addComponent(component: Component): Entity {
		this.components[component.name] = component;
		return this;
	}

	removeComponent(componentName: string): Entity {
		let name = componentName;

		delete this.components[name];
		return this;
	}
}
