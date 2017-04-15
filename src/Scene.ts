import * as PIXI from 'pixi.js';

import Game from './Game';
import GameObject from './GameObject';

abstract class Scene {
	public name: string;
	public container: PIXI.Container;
	protected runningSince: number;
	protected ticker: PIXI.ticker.Ticker;

	constructor(name: string) {
		this.name = name;
		this.container = new PIXI.Container();
		this.runningSince = 0;
		this.ticker = new PIXI.ticker.Ticker();
	}

	public addGameObject(gameObject: GameObject) {
		this.container.addChild(gameObject.container);
	}

	protected abstract update(delta: number): void;
}

export default Scene;
