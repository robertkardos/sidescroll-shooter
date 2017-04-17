import * as PIXI from 'pixi.js';

import { Entity } from '../Entity';
import Game from '../Game';
import { Components } from '../components';

export class ScoreboardEntity extends Entity {
	constructor(container: PIXI.Container, time: number) {
		super();

		let box = new PIXI.Container();

		let image = new PIXI.Graphics();
		image.lineStyle(10, 0xf8fcf8, 0.8);
		image.beginFill(0x006cb0, 0.8);
		image.drawRect(0, 0, 200, 160);

		box.addChild(image);
		let text: PIXI.Text = new PIXI.Text(`You've lasted ${Math.round(time / 60)} seconds.`, {
			fontSize: 20,
			fontFamily: 'Arial',
			fill: '#a1ebff',
			align: 'center'
		});
		text.width = 180;
		text.x = 10;
		text.y = 15;

		box.addChild(text);

		let menuText: PIXI.Text = new PIXI.Text('MENU', {
			fontSize: 50,
			fontFamily: 'Arial',
			fill: '#a1ebff',
			align: 'center'
		});
		menuText.width = 90;
		menuText.x = 54;
		menuText.y = 75;

		box.addChild(menuText);

		box.interactive = true;
		box.buttonMode = true;
		box.on('pointerdown', (event: Event) => {
			Game.switchToScene('main');
		});

		this.addComponent(new Components.Draw(container, box));
		this.addComponent(new Components.Position(300, 160));
	}
}
