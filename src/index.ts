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


app.ticker.add(function(delta) {
	planet.tilePosition.x -= 3;
	space.tilePosition.x -= 0.05;
});
