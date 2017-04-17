import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class VelocityComponent implements Component {
	name: string;
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.name = 'velocity';
		this.x = x;
		this.y = y;
	}
}
