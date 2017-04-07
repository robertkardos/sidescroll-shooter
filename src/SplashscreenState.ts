import * as PIXI from 'pixi.js';

import Game from './Game';
import State from './State';

export default class SplashscreenState extends State {
	constructor(name: string) {
		super(name);

		let splashscreenTexture = PIXI.Texture.fromImage('assets/splashscreen.png');
		let splashscreen = new PIXI.Sprite(splashscreenTexture);
		let blurFilter = new PIXI.filters.BlurFilter();
		blurFilter.blur = 0;

		splashscreen.filters = [blurFilter];

		this.addChild(splashscreen);

		this.ticker.add((delta) => {
			console.log('SplashscreenState ticker');
			if (this.runningSince + this.ticker.elapsedMS > 2000) {
				splashscreen.alpha -= 0.01;
				blurFilter.blur += 0.1;
				if (splashscreen.alpha <= 0) {
					Game.switchToState('main');
				}
			}

			this.runningSince += this.ticker.elapsedMS;
		}, this);
	}
}
