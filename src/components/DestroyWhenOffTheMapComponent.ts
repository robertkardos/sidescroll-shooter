import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class DestroyWhenOffTheMapComponent implements Component {
	name: string;

	constructor() {
		this.name = 'DestroyWhenOffTheMap';
	}
}
