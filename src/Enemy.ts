import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';

export default class Enemy extends Ship {
	public movementAmplitude: number;
	public movementPeriod: number;
	public accelerationOnX: number;
	public accelerationOnY: number;

	constructor() {
		super('assets/torus.png');
		this.container.x = 800;
		this.container.y = Math.random() * (600 - this.sprite.height);

		this.movementPeriod = Math.random() * 50 + 30;
		this.accelerationOnX = Math.random() * 0.4;
		this.accelerationOnY =  0.2;
		this.acceleration = new PIXI.Point(this.accelerationOnX, this.accelerationOnY);

		this.rateOfLosingMomentum = 0.95;
	}

	public update(delta: number) {
		super.update(delta);
		if (this.container.x < 0 - this.sprite.width) {
			this.remove();
		}

		this.go('left')
		let asd = Math.cos(this.container.x / this.movementPeriod);

		if (asd > 0) {
			this.go('up');
		} else {
			this.go('down');
		}
	}
}
