import * as PIXI from 'pixi.js';

import Button from './Button';
import Game from './Game';
import Scene from './Scene';

export default class MainMenuScene extends Scene {
	constructor(name: string) {
		super(name);

		this.container.alpha = 0;

		let menuTexture = PIXI.Texture.fromImage('assets/menu.png');
		let menuBackground = new PIXI.extras.TilingSprite(menuTexture, 800, 600);
		this.container.addChild(menuBackground);

		let logoTexture = PIXI.Texture.fromImage('assets/logo.png');
		let logo = new PIXI.Sprite(logoTexture);
		logo.position.set(248, 10);
		this.container.addChild(logo);

		let game1Button = new Button('GAME1', (this.onGameButtonClick.bind(null, 1)));
		game1Button.position.set(248, 170);
		this.container.addChild(game1Button);

		let game2Button = new Button('GAME2', (this.onGameButtonClick.bind(null, 2)));
		game2Button.position.set(248, 275);
		this.container.addChild(game2Button);

		let game3Button = new Button('GAME3', (this.onGameButtonClick.bind(null, 3)));
		game3Button.position.set(248, 380);
		this.container.addChild(game3Button);

		let exitButton = new Button('EXIT', this.onExitClick);
		exitButton.position.set(248, 485);
		this.container.addChild(exitButton);

		this.ticker.add((delta) => {
			if (this.container.alpha < 1) {
				this.container.alpha += 0.01;
			}
			menuBackground.tilePosition.x -= 20 * (1 - this.container.alpha);
			menuBackground.tilePosition.x -= 10;
		}, this);
	}

	private onGameButtonClick(num: number) {
		Game.switchToScene('game');
	}

	private onExitClick() {
		location.assign('https://threejs.org/');
	}
}
