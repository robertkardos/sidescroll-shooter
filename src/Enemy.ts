import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';

export default class Enemy extends Ship {
	public movementAmplitude: number;
	public movementPeriod: number;
	public movementOnX: number;

	constructor() {
		super('assets/torus.png');
		this.container.x = 800;
		this.container.y = Math.random() * (600 - this.sprite.height);

		this.movementAmplitude = Math.random() * 4 + 2;
		this.movementPeriod = Math.random() * 100 + 50;
		this.movementOnX = -(Math.random() * 7 + 1);

		this.velocity = new PIXI.Point(0, 0);
	}

	public update(delta: number) {
		super.update(delta);

		if (this.container.x < 0 - this.sprite.width && this.state !== 'exploding') {
			this.state = 'left';
		}

		if (this.state === 'live') {
			this.velocity.x = this.movementOnX;
			this.velocity.y = this.movementAmplitude * Math.sin(this.container.x / this.movementPeriod);
		}
	}
}
