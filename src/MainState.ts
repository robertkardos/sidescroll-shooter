import * as PIXI from 'pixi.js';

import Button from './Button';
import Game from './Game';
import State from './State';

export default class MainState extends State {
	constructor(name: string) {
		super(name);

		let menuTexture: PIXI.Texture = PIXI.Texture.fromImage('assets/menu.png');
		let menuBackground = new PIXI.extras.TilingSprite(menuTexture, 800, 600);
		this.container.addChild(menuBackground);

		let logoTexture: PIXI.Texture = PIXI.Texture.fromImage('assets/logo.png');
		let logo = new PIXI.Sprite(logoTexture);
		this.container.addChild(logo);

		logo.x = 248;
		logo.y = 10;

		let game1Button = new Button('GAME1', (this.onGameButtonClick.bind(null, 1)));
		game1Button.x = 248;
		game1Button.y = 170;
		this.container.addChild(game1Button);
		let game2Button = new Button('GAME2', (this.onGameButtonClick.bind(null, 2)));
		game2Button.x = 248;
		game2Button.y = 275;
		this.container.addChild(game2Button);
		let game3Button = new Button('GAME3', (this.onGameButtonClick.bind(null, 3)));
		game3Button.x = 248;
		game3Button.y = 380;
		this.container.addChild(game3Button);
		let exitButton = new Button('EXIT', this.onExitClick);
		exitButton.x = 248;
		exitButton.y = 485;
		this.container.addChild(exitButton);

		this.container.alpha = 0;

		this.ticker.add((delta) => {
			if (this.container.alpha < 1) {
				this.container.alpha += 0.01;
			}
			menuBackground.tilePosition.x -= 20 * (1 - this.container.alpha);
			menuBackground.tilePosition.x -= 10;
		}, this);
	}

	private onGameButtonClick(num: number) {
		console.log(num)
		Game.switchToState('game');
	}

	private onExitClick() {
		location.assign('https://threejs.org/');
	}
}
