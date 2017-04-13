import * as PIXI from 'pixi.js';

import MovingGameObject from './MovingGameObject';
import Particle from './Particle';
import Vector from './util/Vector';

export default class Explosion extends PIXI.Container {
	public velocity: PIXI.Point;
	private particles: Array<Particle>;

	constructor(
		position: PIXI.Point,
		amount: number = 100,
		velocity: PIXI.Point = new PIXI.Point(0, 0)
	) {
		super();

		this.particles = [];
		this.position = position;

		for (let i = 0; i < amount; i++) {
			let particle = new Particle();

			this.particles.push(particle);
			this.addChild(particle);
		}

		this.velocity = velocity;
	}

	public update(delta: number) {
		this.position = Vector.add(new PIXI.Point(), this.position, this.velocity);

		for (let particle of this.particles) {
			particle.update(delta);
		}

		this.alpha -= 0.01;
	}
}
