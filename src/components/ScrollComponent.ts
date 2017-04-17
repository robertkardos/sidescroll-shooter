import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class ScrollComponent implements Component {
	name: string;
	x: number;
	y: number;

	constructor(scrollVector: PIXI.Point) {
		this.name = 'scroll';
		this.x = scrollVector.x;
		this.y = scrollVector.y;
	}
}
