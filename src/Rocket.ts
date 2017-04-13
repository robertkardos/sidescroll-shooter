import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import MovingGameObject from './MovingGameObject';

export default class Rocket extends MovingGameObject {
	constructor(position: PIXI.Point) {
		super('assets/rocket.png');

		this.velocity = new PIXI.Point(10, 0);
		position.y = position.y - this.sprite.height / 2;
		this.container.position = position;
	}

	public update(delta: number) {
		super.update(delta);
		if (this.container.position.x > 800) {
			this.isDisposable = true;
		}
	}
}
