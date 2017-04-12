import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import Rocket from './Rocket';
import Ship from './Ship';

export default class Player extends Ship {
	private cooldown: number;
	private directions: {};

	constructor() {
		super('assets/kestrel.png');
		this.container.position.set(30, 300 - this.sprite.height / 2);
		this.velocity = new PIXI.Point(0);
		this.cooldown = 0;

		this.directions = {
			up: new PIXI.Point(0, -0.3),
			right: new PIXI.Point(0.3, 0),
			down: new PIXI.Point(0, 0.3),
			left: new PIXI.Point(-0.3)
		};
	}

	public update(delta: number) {
		super.update(delta);
		this.decreaseCooldownBy(delta);
		this.stayOnScreen();
		this.loseMomentum();
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

	private loseMomentum() {
		this.velocity.x = this.velocity.x * 0.95;
		this.velocity.y = this.velocity.y * 0.95;
	}

	public go(direction: string) {
		if (this.state !== 'exploding') {
			this.velocity.x += this.directions[direction].x;
			this.velocity.y += this.directions[direction].y;
		}
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
