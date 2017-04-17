import * as PIXI from 'pixi.js';

import Scene from './Scene';
import SceneFactory from './SceneFactory';

export default class Game {
	private static scenes: any;
	public static currentSceneName: string;
	public static currentScene: Scene;
	public static app: PIXI.Application;

	private constructor() {}

	public static create() {
		Game.scenes = {};
		Game.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
		document.body.appendChild(Game.app.view);
		Game.bindControls();

		// let currentScene = SceneFactory.create('splashscreen');
		Game.addScene('splashscreen');
		// Game.currentSceneName = currentScene.name;
	}

	// public static addScene(newScene: Scene) {
	public static addScene(newScene: string) {
		this.currentScene = SceneFactory.create(newScene);
		Game.scenes[newScene] = this.currentScene;
		Game.currentSceneName = newScene;
		Game.app.stage.addChild(Game.scenes[newScene].container);
		Game.scenes[newScene].ticker.start();
	}

	public static switchToScene(sceneName: string) {
		Game.scenes[Game.currentSceneName].ticker.stop();
		Game.app.stage.removeChild(Game.scenes[Game.currentSceneName].container);

		delete Game.scenes[Game.currentSceneName];

		Game.addScene(sceneName);
	}

	public static getCurrentScene() {
		return Game.scenes[Game.currentSceneName];
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
