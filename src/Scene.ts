import * as PIXI from 'pixi.js';

import Game from './Game';

abstract class Scene {
	public name: string;
	public container: PIXI.Container;
	protected runningSince: number;
	public ticker: PIXI.ticker.Ticker;

	constructor(name: string) {
		this.name = name;
		this.container = new PIXI.Container();
		this.runningSince = 0;
		this.ticker = new PIXI.ticker.Ticker();
	}

	protected abstract update(delta: number): void;
}

export default Scene;
