import * as PIXI from 'pixi.js';

import Game from './Game';
import Player from './Player';
import Enemy from './Enemy';
import Ship from './Ship';
import State from './State';

export default class GameState extends State {
	private player: Player;
	private enemies: Array<Enemy>;
	private enemySpawnTimer: number;

	constructor(name: string) {
		super(name);

		this.enemies = [];
		let spaceTexture = PIXI.Texture.fromImage('assets/space.png');
		let space = new PIXI.extras.TilingSprite(spaceTexture, 800, 600);
		this.addChild(space);

		let planetBaseTexture = PIXI.BaseTexture.fromImage('assets/planet.png');
		let planetTexture = new PIXI.Texture(
			planetBaseTexture,
			new PIXI.Rectangle(0, 0, 959, 252)
		);

		let planet = new PIXI.extras.TilingSprite(planetTexture, 800, 252);
		planet.y = 600 - 252;
		this.addChild(planet);

		this.player = new Player();
		this.addChild(this.player.sprite);

		this.enemySpawnTimer = 0;

		this.ticker.add((delta: number) => {
			this.enemySpawnTimer += delta;

			if (this.enemySpawnTimer > 120) {
				this.spawnEnemy();
			}

			this.enemies = this.enemies.filter((enemy) => {
				let isEnemyOnScreen = enemy.update(delta);
				return isEnemyOnScreen;
			});

			planet.tilePosition.x -= 3;
			space.tilePosition.x -= 0.05;

			this.player.update(delta);
		}, this);
	}

	spawnEnemy() {
		let enemy = new Enemy();

		this.enemySpawnTimer = 0;
		this.enemies.push(enemy);
		this.addChild(enemy.sprite);
	}
}
