import * as PIXI from 'pixi.js';

import Game from './Game';
import Scene from './Scene';

export default class SplashscreenScene extends Scene {
	private splashscreen: PIXI.Sprite;
	private blurFilter: PIXI.filters.BlurFilter;
	constructor(name: string) {
		super(name);

		let splashscreenTexture = PIXI.Texture.fromImage('assets/splashscreen.png');
		this.splashscreen = new PIXI.Sprite(splashscreenTexture);
		this.blurFilter = new PIXI.filters.BlurFilter();
		this.blurFilter.blur = 0;

		this.splashscreen.filters = [this.blurFilter];

		this.container.addChild(this.splashscreen);

		this.ticker.add(this.update, this);
	}

	protected update(delta: number): void {
		if (this.runningSince + this.ticker.elapsedMS > 2000) {
			this.splashscreen.alpha -= 0.01;
			this.blurFilter.blur += 0.1;
			if (this.splashscreen.alpha <= 0) {
				Game.switchToScene('main');
			}
		}

		this.runningSince += this.ticker.elapsedMS;
	}

	public keyDownHandler(event: KeyboardEvent) {
		Game.switchToScene('main');
	}
}
