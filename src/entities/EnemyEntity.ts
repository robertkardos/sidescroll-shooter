import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import { Components } from '../components';

export class EnemyEntity extends Entity {
	constructor(container: PIXI.Container) {
		super();

		let texture = PIXI.Texture.fromImage('assets/torus.png');
		let image = new PIXI.Sprite(texture);

		this.addComponent(new Components.Draw(container, image));
		this.addComponent(new Components.Position(800, Math.round(Math.random() * 600)));
		this.addComponent(new Components.Velocity(0, 0));
		this.addComponent(new Components.Collision(1));
		this.addComponent(new Components.Explosive());
		this.addComponent(new Components.RandomMovement());
		this.addComponent(new Components.DestroyWhenOffTheMap());
	}
}
