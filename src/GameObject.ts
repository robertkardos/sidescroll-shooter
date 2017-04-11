import * as PIXI from 'pixi.js';

interface GameObject {
	container: PIXI.Container;
	velocity: PIXI.Point;
	status: string;
	update: (delta: number) => void;
}

export default GameObject;
