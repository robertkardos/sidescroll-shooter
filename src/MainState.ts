import * as PIXI from 'pixi.js';

import Game from './Game';
import State from './State';

export default class MainState extends State {
	constructor(name: string) {
		super(name);

		let menuTexture: PIXI.Texture = PIXI.Texture.fromImage('assets/menu.png');
		let menuBackground = new PIXI.extras.TilingSprite(menuTexture, 800, 600);
		this.container.addChild(menuBackground);

		let gameButtonTexture: PIXI.Texture = PIXI.Texture.fromImage('assets/game.png');
		let gameButton = new PIXI.Sprite(gameButtonTexture);
		gameButton.interactive = true;
		gameButton.buttonMode = true;
		gameButton.on('pointerdown', this.onPlayButtonClick);

		this.container.addChild(gameButton);
		this.container.alpha = 0;

		this.ticker.add((delta) => {
			if (this.container.alpha < 1) {
				this.container.alpha += 0.01;
			}

			menuBackground.tilePosition.x -= 20 * (1 - this.container.alpha);
			menuBackground.tilePosition.x -= 10;
		}, this);
	}

	private onPlayButtonClick() {
		Game.switchToState('game');
	}
}
