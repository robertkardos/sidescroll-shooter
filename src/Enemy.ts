import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';

export default class Enemy extends Ship {
	public collided: boolean;
	public movementAmplitude: number;
	public movementPeriod: number;
	public movementOnX: number;

	constructor() {
		super('assets/torus.png');
		this.sprite.position.x = 800;
		this.sprite.position.y = Math.random() * (600 - this.sprite.height);

		this.movementAmplitude = Math.random() * 5 + 2;
		this.movementPeriod = Math.random() * 130 + 50;
		this.movementOnX = -(Math.random() * 7 + 1);

		this.velocity = new PIXI.Point(0, 0);
		this.collided = false;
	}

	public update(delta: number) {
		super.update(delta);

		this.velocity.y = this.movementAmplitude * Math.sin(this.sprite.position.x / this.movementPeriod);
		this.velocity.x = this.movementOnX;

		if (this.sprite.position.x < 0 - this.sprite.width || this.collided) {
			this.sprite.destroy();
			return false;
		}
		return true;
	}
}
