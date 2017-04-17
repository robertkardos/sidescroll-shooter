import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class FadeOutComponent implements Component {
	name: string;
	alpha: number;

	constructor() {
		this.name = 'fadeOut';
		this.alpha = 1;
	}
}
