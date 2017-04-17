import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class CollisionComponent implements Component {
	name: string;
	group: number;

	constructor(group: number) {
		this.name = 'collision';
		this.group = group;
	}
}
