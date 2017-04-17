import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class KeyboardMovementComponent implements Component {
	name: string;
	controls: {[key: string]: number};

	constructor() {
		this.name = 'KeyboardMovement';
		this.controls = {
			up: 87,
			right: 68,
			down: 83,
			left: 65
		};

	}
}
