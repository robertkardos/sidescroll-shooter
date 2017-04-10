import * as PIXI from 'pixi.js';

import State from './State';
import StateFactory from './StateFactory';

export default class Game {
	private static states: any;
	private static buttons: any;
	public static currentStateName: string;
	public static app: PIXI.Application;

	private constructor() {}

	public static create() {
		Game.states = {};
		Game.buttons = {};
		Game.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
		document.body.appendChild(Game.app.view);
		Game.bindControls();

		Game.addState(StateFactory.create('splashscreen'));
		// Game.addState(StateFactory.create('main'));
		// Game.addState(StateFactory.create('game'));
	}

	public static addState(newState: State) {
		Game.states[newState.name] = newState;
		Game.currentStateName = newState.name;
		Game.states[newState.name].ticker.start();
		Game.app.stage.addChild(Game.states[newState.name].container);
	}

	public static switchToState(stateName: string) {
		Game.states[Game.currentStateName].ticker.stop();
		Game.app.stage.removeChild(Game.states[Game.currentStateName].container);
		delete Game.states[Game.currentStateName];

		Game.addState(StateFactory.create(stateName));
	}

	private static bindControls() {
		let keyUpHandler = (event: any) => {
			if (this.states[this.currentStateName].keyUpHandler) {
				this.states[this.currentStateName].keyUpHandler(event);
				event.preventDefault();
			}
		};

		let keyDownHandler = (event: any) => {
			if (this.states[this.currentStateName].keyDownHandler) {
				this.states[this.currentStateName].keyDownHandler(event);
				event.preventDefault();
			}
		};

		window.addEventListener(
			"keydown", keyDownHandler, false
		);
		window.addEventListener(
			"keyup", keyUpHandler, false
		);
	}
}
