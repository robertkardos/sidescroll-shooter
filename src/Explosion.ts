import * as PIXI from 'pixi.js';

import Particle from './Particle';

export default class Explosion extends PIXI.Container {
	public velocity: PIXI.Point;
	private particles: Array<Particle>;

	constructor(
		position: PIXI.Point,
		amount: number = 50,
		velocity: PIXI.Point = new PIXI.Point(0)
	) {
		super();

		this.particles = [];
		this.position = position;

		for (let i = 0; i < amount; i++) {
			let particle = new Particle();

			this.particles.push(particle);
			this.addChild(particle);
		}

		this.velocity = new PIXI.Point(
			velocity.x / 2,
			velocity.y / 2
		);
	}

	public update(delta: number) {
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		for (let particle of this.particles) {
			particle.update(delta);
		}

		this.alpha -= 0.01;
	}
}
