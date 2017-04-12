import * as PIXI from 'pixi.js';

import Enemy from './Enemy';
import Explosion from './Explosion';
import Game from './Game';
import GameObject from './GameObject';
import Particle from './Particle';
import Player from './Player';
import Rocket from './Rocket';
import Ship from './Ship';
import State from './State';

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
			this.scrollBackground();
			this.tryToSpawnEnemy(delta);
			this.checkForPlayerMove();
			this.detectCollisions();
			this.cleanUp(delta);
			this.update(delta);

			if (this.player.state === 'exploded') {
				delete this.player;
				alert('getrekt');
				Game.switchToState('main');
				return;
			}
		}, this);
	}

	private scrollBackground() {
		this.planet.tilePosition.x -= 3;
		this.space.tilePosition.x -= 0.05;
	}

	private update(delta: number) {
		this.enemies.forEach((enemy) => enemy.update(delta));
		this.projectiles.forEach((projectile) => projectile.update(delta));
		this.player.update(delta);
	}

	private cleanUp(delta: number) {
		this.enemies
			.filter(enemy => enemy.state === 'left' || enemy.state === 'exploded')
			.forEach(enemy => this.container.removeChild(enemy.container));

		this.enemies = this.enemies
			.filter((enemy) => enemy.state === 'live' || enemy.state === 'exploding');

		this.projectiles
			.filter(projectile => projectile.state === 'left' || projectile.state === 'exploded')
			.forEach(projectile => this.container.removeChild(projectile.container));

		this.projectiles = this.projectiles
			.filter((projectile) => projectile.state === 'live');
	}

	private detectCollisions() {
		this.enemies.forEach((enemy) => {
			if (enemy.state === 'live' && this.player.state === 'live') {
				let isPlayerColliding = GameObject.areTheyColliding(this.player, enemy);
				if (isPlayerColliding) {
					enemy.explode();
					this.player.explode();
				}
			}

			if (enemy.state === 'live') {
				for (let projectile of this.projectiles) {
					if (GameObject.areTheyColliding(projectile, enemy)) {
						projectile.container.alpha = 0.5;

						enemy.explode();
						projectile.state = 'exploded';
					} else {
						projectile.container.alpha = 1;
					}
				}
			}
		});
	}

	private tryToSpawnEnemy(delta: number) {
		this.enemySpawnTimer += delta;
		if (this.enemySpawnTimer > 120) {
			this.spawnEnemy();
		}
	}

	private spawnEnemy() {
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

	private checkForPlayerMove() {
		// this.player.velocity.set(0);

		if (this.pressedKeys[32]) {
			if (!this.player.onCooldown()) {
				let rocket = this.player.shoot();
				this.projectiles.push(rocket);
				this.addGameObject(rocket);
			};
		}

		if (this.pressedKeys[87]) {
			this.player.go('up');
		}
		if (this.pressedKeys[68]) {
			this.player.go('right');
		}
		if (this.pressedKeys[83]) {
			this.player.go('down');
		}
		if (this.pressedKeys[65]) {
			this.player.go('left');
		}
	};
}
