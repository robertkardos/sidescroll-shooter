import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';

export default class Enemy extends Ship {
	public collided: boolean;
	constructor() {
		super('assets/torus.png');
		this.sprite.position.x = 800;
		this.sprite.position.y = Math.random() * (600 - this.sprite.height);
		this.velocity = new PIXI.Point(-5, 0);
		this.collided = false;
	}

	public update(delta: number) {
		super.update(delta);
		if (this.sprite.position.x < 0 - this.sprite.width || this.collided) {
			this.sprite.destroy();
			return false;
		}
		return true;
	}
}
