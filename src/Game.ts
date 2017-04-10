import * as PIXI from 'pixi.js';

import State from './State';
import StateFactory from './StateFactory';

export default class Game {
	private static states: any;
	public static currentStateName: string;
	public static app:PIXI.Application;

	private constructor() {}

	public static create() {
		Game.states = {};
		Game.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
		document.body.appendChild(Game.app.view);

		Game.addState(StateFactory.create('splashscreen'));
		Game.addState(StateFactory.create('main'));
		Game.addState(StateFactory.create('game'));
	}

	public static addState(newState: State) {
		Game.states[newState.name] = newState;
		Game.currentStateName = newState.name;
	}

	public static switchToState(stateName: string) {
		Game.states[Game.currentStateName].ticker.stop();
		delete Game.states[Game.currentStateName];
		Game.app.stage.removeChild(Game.states[Game.currentStateName]);
		
		Game.addState(StateFactory.create(stateName));
		Game.states[stateName].ticker.start();
		Game.app.stage.addChild(Game.states[stateName]);
	}

	public static keyboard(keyCode: number) {
		let key: any = {};
		key.code = keyCode;
		key.isDown = false;
		key.isUp = true;
		key.press = undefined;
		key.release = undefined;
		key.upHandler = (event: any) => {
			if (event.keyCode === key.code) {
				if (key.isDown && key.release) key.release();
				key.isDown = false;
				key.isUp = true;
			}
			event.preventDefault();
		};

		key.downHandler = (event: any) => {
			if (event.keyCode === key.code) {
				if (key.isUp && key.press) key.press();
				key.isDown = true;
				key.isUp = false;
			}
			event.preventDefault();
		};

		window.addEventListener(
			"keydown", key.downHandler.bind(key), false
		);
		window.addEventListener(
			"keyup", key.upHandler.bind(key), false
		);
		return key;
	}
}
