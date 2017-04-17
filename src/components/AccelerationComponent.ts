import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class AccelerationComponent implements Component {
	name: string;
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.name = 'acceleration';
		this.x = x;
		this.y = y;
	}
}
