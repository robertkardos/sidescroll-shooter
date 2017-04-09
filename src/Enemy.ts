import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';

export default class Enemy extends Ship {
	constructor() {
		super('assets/torus.png');
		this.sprite.position.x = 800;
		this.sprite.position.y = Math.random() * (600 - this.sprite.height);
		this.velocity = new PIXI.Point(-5, 0);
	}

	public update(delta: number) {
		super.update(delta);
		if (this.sprite.position.x > 0 - this.sprite.width) {
			return true;
		}
		this.sprite.destroy();
		return false;
	}
}
