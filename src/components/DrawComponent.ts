import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class DrawComponent implements Component {
	public name: string;
	public container: PIXI.Container;
	public image: PIXI.DisplayObject;

	constructor(parentContainer: PIXI.Container, image: PIXI.DisplayObject) {
		this.name = 'draw';
		this.container = new PIXI.Container();
		this.image = image;

		this.container.x = 800;
		this.container.addChild(this.image);
		parentContainer.addChild(this.container);
	}
}
