import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Explosion from './Explosion';
import Game from './Game';
import Particle from './Particle';
import Player from './Player';
import Rocket from './Rocket';
import Ship from './Ship';
import State from './State';
import Util from './Util';

export default class GameState extends State {
	private player: Player;
	private enemies: Array<Enemy>;
	private projectiles: Array<Rocket>;
	private explosions: Array<Explosion>;
	private enemySpawnTimer: number;

	constructor(name: string) {
		super(name);

		this.setupControls();
		this.enemies = [];
		this.projectiles = [];
		this.explosions = [];

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
		this.addChild(this.player);
		// this.addChild(this.player.sprite);

		this.enemySpawnTimer = 0;

		this.ticker.add((delta: number) => {
			this.enemySpawnTimer += delta;
			if (this.enemySpawnTimer > 120) {
				this.spawnEnemy();
			}

			this.detectCollisions();

			planet.tilePosition.x -= 3;
			space.tilePosition.x -= 0.05;

			if (this.player && !this.player.update(delta)) {
				delete this.player;
				alert('getrekt');
				Game.switchToState('main');
				return;
			}

			this.explosions = this.explosions
				.filter((explosion) => {
					let isExplosionOnScreen = explosion.update(delta);
					return isExplosionOnScreen;
				});
				// .filter((explosion) => {
				// 	let isExplosionOnScreen = explosion.update(delta);
				// 	return isExplosionOnScreen;
				// });

			this.enemies = this.enemies
				.filter((enemy) => {
					let isEnemyOnScreen = enemy.update(delta);
					return isEnemyOnScreen;
				});

			this.enemies.forEach((enemy) => {
					if (!enemy.collided && !this.player.collided) {
						let isPlayerColliding = Util.areTheyColliding(this.player, enemy);
						if (isPlayerColliding) {
							// let explosion = new Explosion(this.player.sprite.position);
							// this.explosions.push(explosion);
							// this.addChild(explosion);

							enemy.collided = true;
							this.player.collided = true;
						}
					}
				});

			this.projectiles = this.projectiles
				.filter((projectile) => {
					let isProjectileOnScreen = projectile.update();
					return isProjectileOnScreen;
				});
		}, this);
	}

	detectCollisions() {
		for (let projectile of this.projectiles) {
			for (let enemy of this.enemies) {
				let areTheyColliding = Util.areTheyColliding(projectile, enemy);
				if (areTheyColliding) {
					projectile.alpha = 0.5;

					let explosion = new Explosion(projectile.position, 50, enemy.velocity);
					this.explosions.push(explosion);
					this.addChild(explosion);

					enemy.collided = true;
					projectile.collided = true;
				} else {
					projectile.alpha = 1;
				}
			}
		}
	}

	spawnEnemy() {
		let enemy = new Enemy();

		this.enemySpawnTimer = 0;
		this.enemies.push(enemy);
		this.addChild(enemy);
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
				this.addChild(rocket);
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
