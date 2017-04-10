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
	private space: PIXI.extras.TilingSprite;
	private planet: PIXI.extras.TilingSprite;

	private pressedKeys: Array<boolean>;
	private enemySpawnTimer: number;

	constructor(name: string) {
		super(name);

		this.enemies = [];
		this.projectiles = [];
		this.explosions = [];

		this.pressedKeys = [];

		let spaceTexture = PIXI.Texture.fromImage('assets/space.png');
		this.space = new PIXI.extras.TilingSprite(spaceTexture, 800, 600);
		this.container.addChild(this.space);

		let planetBaseTexture = PIXI.BaseTexture.fromImage('assets/planet.png');
		let planetTexture = new PIXI.Texture(
			planetBaseTexture,
			new PIXI.Rectangle(0, 0, 959, 252)
		);
		this.planet = new PIXI.extras.TilingSprite(planetTexture, 800, 252);
		this.planet.y = 600 - 252;
		this.container.addChild(this.planet);


		this.enemySpawnTimer = 0;

		this.player = new Player();
		this.addGameObject(this.player);

		this.ticker.add((delta: number) => {
			this.enemySpawnTimer += delta;
			if (this.enemySpawnTimer > 120) {
				this.spawnEnemy();
			}

			this.detectCollisions();
			this.scrollBackground();

			this.move();

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

			this.enemies = this.enemies
				.filter((enemy) => {
					let isEnemyOnScreen = enemy.update(delta);
					return isEnemyOnScreen;
				});

			this.projectiles = this.projectiles
				.filter((projectile) => {
					let isProjectileOnScreen = projectile.update();
					return isProjectileOnScreen;
				});
		}, this);
	}

	scrollBackground() {
		this.planet.tilePosition.x -= 3;
		this.space.tilePosition.x -= 0.05;
	}

	detectCollisions() {
		this.enemies.forEach((enemy) => {
			if (!enemy.collided && !this.player.collided) {
				let isPlayerColliding = Util.areTheyColliding(this.player, enemy);
				if (isPlayerColliding) {
					enemy.explode();
					this.player.explode();
				}
			}

			for (let projectile of this.projectiles) {
				let areTheyColliding = Util.areTheyColliding(projectile, enemy);
				if (areTheyColliding) {
					projectile.container.alpha = 0.5;

					let explosion = new Explosion(projectile.container.position, 50, enemy.velocity);
					this.explosions.push(explosion);
					this.container.addChild(explosion);

					enemy.explode();
					projectile.collided = true;
				} else {
					projectile.container.alpha = 1;
				}
			}
		});

	}

	spawnEnemy() {
		let enemy = new Enemy();
		this.enemySpawnTimer = 0;
		this.enemies.push(enemy);
		this.addGameObject(enemy);
	}

	public keyUpHandler(event: KeyboardEvent) {
		this.pressedKeys[event.keyCode] = false;
	}

	public keyDownHandler(event: KeyboardEvent) {
		this.pressedKeys[event.keyCode] = true;
	}

	move() {
		this.player.velocity.set(0);

		if (this.pressedKeys[32]) {
			if (!this.player.onCooldown()) {
				let rocket = this.player.shoot();
				this.projectiles.push(rocket);
				this.addGameObject(rocket);
			};
		}

		if (this.pressedKeys[87]) {
			this.player.velocity.y = -3;
		}
		if (this.pressedKeys[68]) {
			this.player.velocity.x = 3;
		}
		if (this.pressedKeys[83]) {
			this.player.velocity.y = 3;
		}
		if (this.pressedKeys[65]) {
			this.player.velocity.x = -3;
		}
	};
}
