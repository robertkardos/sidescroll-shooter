import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import Rocket from './Rocket';
import Ship from './Ship';

export default class Player extends Ship {
	private cooldown: number;

	constructor() {
		super('assets/kestrel.png');
		this.velocity = new PIXI.Point(0, 0);
		this.cooldown = 20;
	}

	public update(delta: number) {
		let isAlive = super.update(delta);
		if (!isAlive) {
			return false;
		}

		this.cooldown += delta;

		return true;
	}

	public shoot() {
		let rocketPosition: PIXI.Point = new PIXI.Point(
			this.x + this.sprite.width - 10,
			this.y + this.sprite.height / 2,
		);
		let rocket = new Rocket(rocketPosition);
		this.cooldown = 0;

		return rocket;
	}

	public onCooldown() {
		return this.cooldown < 20;
	}
}
