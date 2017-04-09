import * as PIXI from 'pixi.js';

import Game from './Game';
import Rocket from './Rocket';
import Ship from './Ship';

export default class Player extends Ship {
	private cooldown: number;
	private projectiles: Array<Rocket>;

	constructor() {
		super('assets/kestrel.png');
		this.velocity = new PIXI.Point(0, 0);
		this.cooldown = 20;
		this.setupControls();
		this.projectiles = [];
	}

	public update(delta: number) {
		super.update(delta);
		this.cooldown += delta;
		this.projectiles = this.projectiles.filter((projectile) => {
			let isProjectileOnScreen = projectile.update();
			return isProjectileOnScreen;
		});
	}

	private shoot() {
		if (this.cooldown >= 20) {
			let rocketPosition: PIXI.Point = new PIXI.Point(
				this.sprite.position.x + this.sprite.width - 10,
				this.sprite.position.y + this.sprite.height / 2,
			);
			let rocket = new Rocket(rocketPosition);
			this.projectiles.push(rocket);

			this.cooldown = 0;
		}
	}

	public setupControls() {
		let space = Game.keyboard(32);
		let up = Game.keyboard(87);
		let right = Game.keyboard(68);
		let down = Game.keyboard(83);
		let left = Game.keyboard(65);

		space.press = () => {
			this.shoot();
		};

		up.press = () => {
			this.velocity.y = -3;
		};
		right.press = () => {
			this.velocity.x = 3;
		};
		down.press = () => {
			this.velocity.y = 3;
		};
		left.press = () => {
			this.velocity.x = -3;
		};

		up.release = () => {
			if (!down.isDown) {
				this.velocity.y = 0;
			}
		};
		right.release = () => {
			if (!left.isDown) {
				this.velocity.x = 0;
			}
		};
		down.release = () => {
			if (!up.isDown) {
				this.velocity.y = 0;
			}
		};
		left.release = () => {
			if (!right.isDown) {
				this.velocity.x = 0;
			}
		};
	}
}
