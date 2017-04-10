import * as PIXI from 'pixi.js';

interface GameObject {
	container: PIXI.Container;
	velocity: PIXI.Point;
	update: (delta: number) => void;
}

export default GameObject;
