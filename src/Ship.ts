import * as PIXI from 'pixi.js';

import Game from './Game';
import Rocket from './Rocket';

export default class Ship extends PIXI.DisplayObject {
	public velocity: PIXI.Point;
	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;

	constructor(imageSrc: string) {
		super();
		this.texture = PIXI.Texture.fromImage(imageSrc);
		this.sprite = new PIXI.Sprite(this.texture);
	}

	public update(delta: number) {
		this.sprite.position.x += this.velocity.x;
		this.sprite.position.y += this.velocity.y;
	}
}
