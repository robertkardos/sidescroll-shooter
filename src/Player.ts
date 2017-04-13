import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import Rocket from './Rocket';
import Ship from './Ship';

import ShipState from './ShipState';
import ShipLiveState from './ShipLiveState';

export default class Player extends Ship {
	private cooldown: number;

	constructor() {
		super('assets/kestrel.png');
		this.container.position.set(30, 300 - this.sprite.height / 2);
		this.cooldown = 0;

		this.acceleration = new PIXI.Point(0.4, 0.4);
		this.rateOfLosingMomentum = 0.94;
	}

	public update(delta: number) {
		super.update(delta);
		this.decreaseCooldownBy(delta);
		this.stayOnScreen();
	}

	public shoot() {
		this.cooldown = 20;

		let rocketPosition = new PIXI.Point(
			this.container.x + this.sprite.width - 10,
			this.container.y + this.sprite.height / 2,
		);
		let rocket = new Rocket(rocketPosition);
		return rocket;
	}

	public stayOnScreen() {
		if (this.container.x < 0) {
			this.container.x = 0;
		}
		if (this.container.x > 800 - this.sprite.width) {
			this.container.x = 800 - this.sprite.width;
		}
		if (this.container.y < 0) {
			this.container.y = 0;
		}
		if (this.container.y > 600 - this.sprite.height) {
			this.container.y = 600 - this.sprite.height;
		}
	}

	public decreaseCooldownBy(delta: number) {
		this.cooldown -= delta;
	}

	public onCooldown() {
		return this.cooldown > 0;
	}
}
