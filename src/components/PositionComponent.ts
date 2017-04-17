import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class PositionComponent implements Component {
	name: string;
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.name = 'position';
		this.x = x;
		this.y = y;
	}
}
