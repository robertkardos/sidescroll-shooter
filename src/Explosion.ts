import * as PIXI from 'pixi.js';

import Particle from './Particle';

export default class Explosion extends PIXI.Container {
	public velocity: PIXI.Point;
	private graphics: PIXI.Graphics;
	private particles: Array<Particle>;

	constructor(
		position: PIXI.Point,
		amount: number = 100,
		velocity: PIXI.Point = new PIXI.Point(0)
	) {
		super();

		this.particles = [];

		// let xRandomRange = velocity.x / 2;
		// let yRandomRange = velocity.y / 2;

		for (let i = 0; i < amount; i++) {
			let particle = new Particle(
				position
			);

			this.particles.push(particle);
			this.addChild(particle);
		}

		this.velocity = new PIXI.Point(
			velocity.x / 2,
			velocity.y / 2
		);
	}

	public update(delta: number) {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		for (let particle of this.particles) {
			particle.update(delta);
		}

		this.alpha -= 0.01;
		if (this.alpha === 0) {
			this.destroy();
			return false;
		}
		return true;
	}
}
