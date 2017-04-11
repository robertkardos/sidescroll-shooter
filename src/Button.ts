import * as PIXI from 'pixi.js';

export default class Button extends PIXI.Container {
	public text: string;

	constructor(text: string, onClick: (gameSession?: number) => void) {
		super();

		this.text = text;

		let buttonTexture: PIXI.Texture = PIXI.Texture.fromImage('assets/button.png');
		let button = new PIXI.Sprite(buttonTexture);
		button.interactive = true;
		button.buttonMode = true;
		button.on('pointerdown', onClick);

		var spinningText = new PIXI.Text(text, {
			fontSize: 60,
			fontFamily: 'Arial',
			fill: '#a1ebff',
			align: 'center',
			stroke: '#FFFFFF',
			strokeThickness: 6
		});

		spinningText.width = 274;
		spinningText.x = 25;
		spinningText.y = 15;

		this.addChild(button);
		this.addChild(spinningText);
	}
}
