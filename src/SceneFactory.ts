import * as PIXI from 'pixi.js';

import Game from './Game';

import Scene from './Scene';

import GameScene from './GameScene';
import MainMenuScene from './MainMenuScene';
import SplashscreenScene from './SplashscreenScene';

export default class SceneFactory {

	private constructor() {}

	public static create(type: string): Scene {

		let scene: Scene;

		switch(type) {
			case 'splashscreen':
				scene = new SplashscreenScene('splashscreen');
				break;
			case 'main':
				scene = new MainMenuScene('main');
				break;
			case 'game':
				scene = new GameScene('game');
				break;
		}

		return scene;
	}

}
