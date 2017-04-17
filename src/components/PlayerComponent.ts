import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class PlayerComponent implements Component {
	name: string;

	constructor() {
		this.name = 'player';
	}
}
