import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { Components } from '../components';

export class BackgroundEntity extends Entity {
	constructor(
		container: PIXI.Container,
		asset: string,
		size: PIXI.Point,
		position: PIXI.Point,
		scrolling: PIXI.Point
	) {
		super();

		let backgroundTexture = PIXI.Texture.fromImage(asset);
		let background = new PIXI.extras.TilingSprite(backgroundTexture, size.x, size.y);

		this.addComponent(new Components.Draw(container, background));
		this.addComponent(new Components.Position(position.x, position.y));
		this.addComponent(new Components.Scroll(scrolling));
	}
}
