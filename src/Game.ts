import * as PIXI from 'pixi.js';
import State from './State';

export default class Game {
	private static states: any;
	public static currentStateName: string;
	public static app:PIXI.Application;

	private constructor() {}

	public static create() {
		Game.states = [];
		Game.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
		document.body.appendChild(Game.app.view);
	}

	public static addState(newState: State) {
		Game.states[newState.name] = newState;
		Game.currentStateName = newState.name;
	}

	public static switchToState(stateName: string) {
		Game.states[Game.currentStateName].ticker.stop();
		Game.app.stage.removeChild(Game.states[Game.currentStateName]);
		Game.currentStateName = stateName;
		Game.states[stateName].ticker.start();
		Game.app.stage.addChild(Game.states[stateName]);
	}
}
