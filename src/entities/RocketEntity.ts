import * as PIXI from 'pixi.js';

import { Components } from '../components';
import { Entity } from '../Entity';
import Game from '../Game';

export class RocketEntity extends Entity {
	constructor(container: PIXI.Container, position: PIXI.Point) {
		super();

		let texture = PIXI.Texture.fromImage('assets/rocket.png');
		let image = new PIXI.Sprite(texture);

		this.addComponent(new Components.Draw(container, image));
		this.addComponent(new Components.Position(position.x, position.y));
		this.addComponent(new Components.Velocity(10, 0));
		this.addComponent(new Components.DestroyWhenOffTheMap());
		this.addComponent(new Components.Collision(2));
	}
}
