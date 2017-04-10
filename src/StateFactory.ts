import * as PIXI from 'pixi.js';

import Game from './Game';

import State from './State';

import GameState from './GameState';
import MainState from './MainState';
import SplashscreenState from './SplashscreenState';

export default class StateFactory {

	private constructor() {}

	public static create(type: string): State {

		let state: State;

		switch(type) {
			case 'splashscreen':
				state = new SplashscreenState('splashscreen');
				break;
			case 'main':
				state = new MainState('main');
				break;
			case 'game':
				state = new GameState('game');
				break;
		}

		return state;
	}

}
