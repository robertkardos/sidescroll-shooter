import * as PIXI from 'pixi.js';

import GameObject from './GameObject';

abstract class MovingGameObject extends GameObject {
	velocity: PIXI.Point;

	constructor(imageSrc: string) {
		super(imageSrc);
		this.velocity = new PIXI.Point(0);
	}

	public update(delta: number) {
		this.move();
	};

	move(): void {
		this.container.position.x += this.velocity.x;
		this.container.position.y += this.velocity.y;
	}
}

export default MovingGameObject;
