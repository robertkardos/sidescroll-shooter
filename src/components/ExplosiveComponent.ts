import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class ExplosiveComponent implements Component {
	name: string;

	constructor() {
		this.name = 'explosive';
	}
}
