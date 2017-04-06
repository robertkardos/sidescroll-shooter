import * as PIXI from 'pixi.js';

let app = new PIXI.Application(800, 600, {backgroundColor : 0x9999bb});
document.body.appendChild(app.view);

let backgroundContainer = new PIXI.Container();
app.stage.addChild(backgroundContainer);


let spaceTexture = PIXI.Texture.fromImage('assets/space.png');
let space = new PIXI.extras.TilingSprite(spaceTexture, 800, 600);
backgroundContainer.addChild(space);

let planetBaseTexture = PIXI.BaseTexture.fromImage('assets/planet.png');
let planetTexture = new PIXI.Texture(
	planetBaseTexture,
	new PIXI.Rectangle(0, 0, 959, 252)
);

let planet = new PIXI.extras.TilingSprite(planetTexture, 800, 252);
planet.y = 600 - 252;
backgroundContainer.addChild(planet);

let menuTexture: PIXI.Texture = PIXI.Texture.fromImage('assets/menu.png');
let menu = new PIXI.extras.TilingSprite(menuTexture, 800, 600);
backgroundContainer.addChild(menu);

let splashscreenTexture = PIXI.Texture.fromImage('assets/splashscreen.png');
let splashscreen = new PIXI.Sprite(splashscreenTexture);
let blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 0;

splashscreen.filters = [blurFilter];

backgroundContainer.addChild(splashscreen);

let runningSince = 0;

// let ticker = PIXI.ticker.shared;
let splashscreenTicker = new PIXI.ticker.Ticker();
splashscreenTicker.autoStart = true;

splashscreenTicker.add(function(delta) {
	if (runningSince + splashscreenTicker.elapsedMS > 2000) {
		splashscreen.alpha -= 0.01;
		blurFilter.blur += 0.1;

		if (!menuTicker.started) {
			menuTicker.start();
		}
		if (splashscreen.alpha <= 0) {
			splashscreenTicker.stop();
		}
	}

	runningSince += menuTicker.elapsedMS;

});

splashscreenTicker.start();

let menuTicker = new PIXI.ticker.Ticker();
menuTicker.add(function(delta) {
	menu.tilePosition.x -= 8;
	planet.tilePosition.x -= 3;
	space.tilePosition.x -= 0.05;
});
