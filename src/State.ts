import * as PIXI from 'pixi.js';

import Game from './Game';

export default class State extends PIXI.Container {
	public name: string;
	protected ticker: PIXI.ticker.Ticker;
	protected runningSince: number;

	constructor(name: string) {
		super();
		this.name = name;
		this.runningSince = 0;
		this.ticker = new PIXI.ticker.Ticker();
		Game.addState(this);
	}
}
