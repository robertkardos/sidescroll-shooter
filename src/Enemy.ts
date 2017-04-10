import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';

export default class Enemy extends Ship {
	public movementAmplitude: number;
	public movementPeriod: number;
	public movementOnX: number;

	constructor() {
		super('assets/torus.png');
		this.x = 800;
		this.y = Math.random() * (600 - this.sprite.height);

		this.movementAmplitude = Math.random() * 5 + 2;
		this.movementPeriod = Math.random() * 130 + 50;
		this.movementOnX = -(Math.random() * 7 + 1);

		this.velocity = new PIXI.Point(0, 0);
		this.collided = false;
	}

	public update(delta: number) {
		let isAlive = super.update(delta);
		if (!isAlive || this.x < 0 - this.sprite.width) {
			return false;
		}
		this.velocity.y = this.movementAmplitude * Math.sin(this.x / this.movementPeriod);
		this.velocity.x = this.movementOnX;

		return true;
		// if (this.x < 0 - this.sprite.width) {
		// 	this.destroy();
		// 	return false;
		// }
	}
}
