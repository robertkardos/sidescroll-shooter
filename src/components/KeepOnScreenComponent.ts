import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class KeepOnScreenComponent implements Component {
	name: string;

	constructor() {
		this.name = 'keepOnScreen';
	}
}
