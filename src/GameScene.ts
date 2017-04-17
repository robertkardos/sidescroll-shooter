import * as PIXI from 'pixi.js';

import { Components } from './components';

import { Entity } from './Entity';
import { GameManager } from './GameManager';
import { EntityCreator } from './EntityCreator';
import Scene from './Scene';


import { Systems } from './systems';
import { System } from './systems/System';

export default class GameScene extends Scene {
	private gameManager: GameManager;
	private entityCreator: EntityCreator;

	private space: PIXI.extras.TilingSprite;
	private planet: PIXI.extras.TilingSprite;

	private enemySpawnTimer: number;

	private pressedKeys: Array<boolean>;
	constructor(name: string) {
		super(name);

		this.pressedKeys = [];
		this.enemySpawnTimer = 0;

		this.gameManager = new GameManager();
		this.entityCreator = new EntityCreator(this.gameManager, this.container);

		this.gameManager.addSystem(new Systems.EnemySpawner(this.entityCreator, 120));
		this.gameManager.addSystem(new Systems.Collision(this.entityCreator));
		this.gameManager.addSystem(new Systems.KeyboardMovement(this.pressedKeys));
		this.gameManager.addSystem(new Systems.RandomMovement());
		this.gameManager.addSystem(new Systems.Shoot(this.entityCreator));
		this.gameManager.addSystem(new Systems.Movement());
		this.gameManager.addSystem(new Systems.Momentum());
		this.gameManager.addSystem(new Systems.KeepOnScreen());
		this.gameManager.addSystem(new Systems.Draw());
		this.gameManager.addSystem(new Systems.Scroll());
		this.gameManager.addSystem(new Systems.FadeOut());
		this.gameManager.addSystem(new Systems.DestroyWhenOffTheMap());
		this.gameManager.addSystem(new Systems.StopWhenPlayerIsDead(this.entityCreator));

		let spaceBackgroundEntity = this.entityCreator.createBackground(
			'assets/space.png',
			new PIXI.Point(800, 600),
			new PIXI.Point(0, 0),
			new PIXI.Point(-0.05, 0)
		);

		let planetBackgroundEntity = this.entityCreator.createBackground(
			'assets/planet.png',
			new PIXI.Point(959, 252),
			new PIXI.Point(0, 600 - 252),
			new PIXI.Point(-3, 0)
		);

		let playerEntity = this.entityCreator.createPlayer();
		let enemyEntity = this.entityCreator.createEnemy();

		this.ticker.add(this.update, this);
	}

	protected update(delta: number) {
		this.gameManager.update(delta);
	}

	public keyUpHandler(event: KeyboardEvent) {
		this.pressedKeys[event.keyCode] = false;
	}

	public keyDownHandler(event: KeyboardEvent) {
		this.pressedKeys[event.keyCode] = true;
	}
}
