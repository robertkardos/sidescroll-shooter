import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Game from './Game';
import Player from './Player';
import Rocket from './Rocket';
import Ship from './Ship';
import State from './State';
import Util from './Util';

export default class GameState extends State {
	private player: Player;
	private enemies: Array<Enemy>;
	private projectiles: Array<Rocket>;
	private particles: Array<PIXI.Graphics>;
	private enemySpawnTimer: number;

	constructor(name: string) {
		super(name);

		this.setupControls();
		this.enemies = [];
		this.projectiles = [];
		this.particles = [];

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

			this.detectCollisions();

			planet.tilePosition.x -= 3;
			space.tilePosition.x -= 0.05;
			this.player.update(delta);

			this.enemies = this.enemies
				.filter((enemy) => {
					let isEnemyOnScreen = enemy.update(delta);
					return isEnemyOnScreen;
				})
				// .filter((enemy) => {
				// 	if (!enemy.collided) {
				// 		return true;
				// 	}
				// 	enemy.sprite.destroy();
				// });

			this.projectiles = this.projectiles
				.filter((projectile) => {
					let isProjectileOnScreen = projectile.update();
					return isProjectileOnScreen;
				})
				// .filter((projectile) => {
				// 	if (!projectile.collided) {
				// 		return true;
				// 	}
				// 	projectile.sprite.destroy();
				// });
		}, this);
	}

	detectCollisions() {
		for (let projectile of this.projectiles) {
			for (let enemy of this.enemies) {
				let areTheyColliding = Util.areTheyColliding(projectile, enemy);
				if (areTheyColliding) {
					projectile.sprite.alpha = 0.5;
					let particleContainer = new PIXI.particles.ParticleContainer();

					for (let i = 0; i < 100; ++i) {
						var graphics = new PIXI.Graphics();

						graphics.lineStyle(2, 0xf1381f, 1);
						graphics.beginFill(0xFF966B, 1);
						graphics.drawRect(
							projectile.sprite.position.x + 30 * Math.random(),
							projectile.sprite.position.y + 30 * Math.random(),
							5,
							5
						);

						this.addChild(graphics);
					}

					enemy.collided = true;
					projectile.collided = true;
				} else {
					projectile.sprite.alpha = 1;
				}
			}
		}
	}

	spawnEnemy() {
		let enemy = new Enemy();

		this.enemySpawnTimer = 0;
		this.enemies.push(enemy);
		this.addChild(enemy.sprite);
	}

	public setupControls() {
		let space = Game.keyboard(32);
		let up = Game.keyboard(87);
		let right = Game.keyboard(68);
		let down = Game.keyboard(83);
		let left = Game.keyboard(65);

		space.press = () => {
			if (!this.player.onCooldown()) {
				let rocket = this.player.shoot();
				this.projectiles.push(rocket);
				this.addChild(rocket.sprite);
			};
		};

		up.press = () => {
			this.player.velocity.y = -3;
		};
		right.press = () => {
			this.player.velocity.x = 3;
		};
		down.press = () => {
			this.player.velocity.y = 3;
		};
		left.press = () => {
			this.player.velocity.x = -3;
		};

		up.release = () => {
			if (!down.isDown) {
				this.player.velocity.y = 0;
			}
		};
		right.release = () => {
			if (!left.isDown) {
				this.player.velocity.x = 0;
			}
		};
		down.release = () => {
			if (!up.isDown) {
				this.player.velocity.y = 0;
			}
		};
		left.release = () => {
			if (!right.isDown) {
				this.player.velocity.x = 0;
			}
		};
	}
}
