import * as PIXI from 'pixi.js';

import Scene from './Scene';
import SceneFactory from './SceneFactory';

export default class Game {
	private static scenes: any;
	public static currentSceneName: string;
	public static app: PIXI.Application;

	private constructor() {}

	public static create() {
		Game.scenes = {};
		Game.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
		document.body.appendChild(Game.app.view);
		Game.bindControls();

		Game.addScene(SceneFactory.create('splashscreen'));
	}

	public static addScene(newScene: Scene) {
		Game.scenes[newScene.name] = newScene;
		Game.currentSceneName = newScene.name;
		Game.scenes[newScene.name].ticker.start();
		Game.app.stage.addChild(Game.scenes[newScene.name].container);
	}

	public static switchToScene(sceneName: string) {
		Game.scenes[Game.currentSceneName].ticker.stop();
		Game.app.stage.removeChild(Game.scenes[Game.currentSceneName].container);
		delete Game.scenes[Game.currentSceneName];

		Game.addScene(SceneFactory.create(sceneName));
	}

	private static bindControls() {
		let keyUpHandler = (event: any) => {
			if (this.scenes[this.currentSceneName].keyUpHandler) {
				this.scenes[this.currentSceneName].keyUpHandler(event);
				event.preventDefault();
			}
		};

		let keyDownHandler = (event: any) => {
			if (this.scenes[this.currentSceneName].keyDownHandler) {
				this.scenes[this.currentSceneName].keyDownHandler(event);
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
