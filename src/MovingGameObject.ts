import * as PIXI from 'pixi.js';

import GameObject from './GameObject';
import Vector from './util/Vector';

abstract class MovingGameObject extends GameObject {
	velocity: PIXI.Point;

	constructor(imageSrc: string) {
		super(imageSrc);
		this.velocity = new PIXI.Point(0);
	}

	public update(delta: number) {
		this.move();
	}

	move(): void {
		this.container.position = Vector.add(
			new PIXI.Point(),
			this.container.position,
			this.velocity
		);
	}
}

export default MovingGameObject;
