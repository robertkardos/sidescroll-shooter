import * as PIXI from 'pixi.js';

import Game from './Game';
import Ship from './Ship';
import State from './State';

export default class GameState extends State {
	private ship: Ship;

	constructor(name: string) {
		super(name);

		let spaceTexture = PIXI.Texture.fromImage('assets/space.png');
		let space = new PIXI.extras.TilingSprite(spaceTexture, 800, 600);
		this.addChild(space);

		let planetBaseTexture = PIXI.BaseTexture.fromImage('assets/planet.png');
		let planetTexture = new PIXI.Texture(
			planetBaseTexture,
			new PIXI.Rectangle(0, 0, 959, 252)
		);

		let planet = new PIXI.extras.TilingSprite(planetTexture, 800, 252);
		planet.y = 600 - 252;
		this.addChild(planet);

		this.ship = new Ship();
		this.addChild(this.ship.sprite);

		this.ticker.add((delta: number) => {
			planet.tilePosition.x -= 3;
			space.tilePosition.x -= 0.05;

			this.ship.update(delta);
		}, this);
	}
}
