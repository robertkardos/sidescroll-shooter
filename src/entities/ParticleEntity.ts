import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { Components } from '../components';
import { Vector } from '../util';

export class ParticleEntity extends Entity {
	constructor(container: PIXI.Container, position: {x: number, y: number}) {
		super();

		let image = new PIXI.Graphics();

		let direction = Math.random() * 2 * Math.PI;
		let velocityScale = Math.random();
		let size = Math.round(Math.random() * 10) + 3;
		let colors = [
			0xffffff,
			0xfffe00,
			0xff8206,
			0xfb0000,
			0xa70103
		];

		let colorBasedOnVelocity = colors[Math.floor(velocityScale / 0.2)];
		image.lineStyle(1, 0x000000, 1);
		image.beginFill(colorBasedOnVelocity, 1);
		image.drawRect(0, 0, size, size);

		let velocity = Vector.scale(
			new PIXI.Point(),
			new PIXI.Point(
				Math.cos(direction),
				Math.sin(direction)
			),
			velocityScale
		);


		this.addComponent(new Components.Draw(container, image));
		this.addComponent(new Components.Position(position.x, position.y));
		this.addComponent(new Components.Velocity(velocity.x, velocity.y));
		this.addComponent(new Components.FadeOut());
	}
}
