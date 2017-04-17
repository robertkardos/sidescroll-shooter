import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { Components } from '../components';

export class PlayerEntity extends Entity {
	constructor(container: PIXI.Container) {
		super();

		let texture = PIXI.Texture.fromImage('assets/kestrel.png');
		let image = new PIXI.Sprite(texture);

		this.addComponent(new Components.Draw(container, image));
		this.addComponent(new Components.Position(10, 250));
		this.addComponent(new Components.Velocity(0, 0));
		this.addComponent(new Components.KeyboardMovement());
		this.addComponent(new Components.KeepOnScreen());
		this.addComponent(new Components.Collision(0));
		this.addComponent(new Components.Explosive());
		this.addComponent(new Components.Shoot(20));
		this.addComponent(new Components.Acceleration(0.4, 0.4));
		this.addComponent(new Components.Momentum(0.94));
		this.addComponent(new Components.Player());
	}
}
