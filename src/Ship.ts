import * as PIXI from 'pixi.js';

import Game from './Game';
import Rocket from './Rocket';

export default class Ship extends PIXI.DisplayObject {
	public velocity: PIXI.Point;
	private cooldown: number;
	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;
	private projectiles: Array<Rocket>;

	constructor() {
		super();
		this.velocity = new PIXI.Point(0, 0);
		this.cooldown = 20;
		this.texture = PIXI.Texture.fromImage('assets/kestrel.png');
		this.sprite = new PIXI.Sprite(this.texture);
		this.setupControls();
		this.projectiles = [];
	}

	public update(delta: number) {
		this.cooldown += delta;
		this.sprite.position.x += this.velocity.x;
		this.sprite.position.y += this.velocity.y;
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
			)
			let rocket = new Rocket(rocketPosition);
			this.projectiles.push(rocket);

			this.cooldown = 0;
		}
	}

	public setupControls() {
		let space = Game.keyboard(32);
		let up = Game.keyboard(38);
		let right = Game.keyboard(39);
		let down = Game.keyboard(40);
		let left = Game.keyboard(37);

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
