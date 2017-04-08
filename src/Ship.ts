import * as PIXI from 'pixi.js';

import Game from './Game';

export default class Ship extends PIXI.DisplayObject {
	public velocity: PIXI.Point;
	private texture: PIXI.Texture;
	public sprite: PIXI.Sprite;

	constructor() {
		super();
		this.velocity = new PIXI.Point(0, 0);
		this.texture = PIXI.Texture.fromImage('assets/kestrel.png');
		this.sprite = new PIXI.Sprite(this.texture);
		this.setupControls();
	}

	public update() {
		this.sprite.position.x += this.velocity.x;
		this.sprite.position.y += this.velocity.y;
	}


	public setupControls() {
		let left = Game.keyboard(37);
		let up = Game.keyboard(38);
		let right = Game.keyboard(39);
		let down = Game.keyboard(40);

		left.release = () => {
			if (!right.isDown) {
				this.velocity.x = 0;
			}
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

		left.press = () => {
			this.velocity.x = -2;
		};
		up.press = () => {
			this.velocity.y = -2;
		};
		right.press = () => {
			this.velocity.x = 2;
		};
		down.press = () => {
			this.velocity.y = 2;
		};
	}
}
