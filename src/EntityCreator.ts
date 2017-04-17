import * as PIXI from 'pixi.js';

import { GameManager } from './GameManager';

import { BackgroundEntity } from './entities/BackgroundEntity';
import { EnemyEntity } from './entities/EnemyEntity';
import { ParticleEntity } from './entities/ParticleEntity';
import { PlayerEntity } from './entities/PlayerEntity';
import { RocketEntity } from './entities/RocketEntity';
import { ScoreboardEntity } from './entities/ScoreboardEntity';

export class EntityCreator {
	gameManager: GameManager;
	container: PIXI.Container;

	constructor(gameManager: GameManager, container: PIXI.Container) {
		this.gameManager = gameManager;
		this.container = container;
	}

	public createBackground(
		asset: string,
		size: PIXI.Point,
		position: PIXI.Point,
		scrolling: PIXI.Point
	) {
		let background = new BackgroundEntity(
			this.container,
			asset,
			size,
			position,
			scrolling
		);
		this.gameManager.addEntity(background);
	}

	public createPlayer() {
		let player = new PlayerEntity(this.container);
		this.gameManager.addEntity(player);
	}

	public createScoreboard(time: number) {
		let scoreboard = new ScoreboardEntity(this.container, time);
		this.gameManager.addEntity(scoreboard);
	}

	public createEnemy() {
		let enemy = new EnemyEntity(this.container);
		this.gameManager.addEntity(enemy);
	}

	public createRocket(position: PIXI.Point) {
		let rocket = new RocketEntity(this.container, position);
		this.gameManager.addEntity(rocket);
	}

	public createParticles(numberOfParticles: number, position: {x: number, y: number}) {
		for (let i = 0; i < numberOfParticles; i++) {
			let particle = new ParticleEntity(this.container, position);
			this.gameManager.addEntity(particle);
		}
	}
}
