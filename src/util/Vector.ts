import * as PIXI from 'pixi.js';

interface Vector {
	x: number;
	y: number;
};

export default class VectorUtil {
	public static scale<T extends Vector>(output: T, vector: T, scale: number): T {
		output.x = vector.x * scale;
		output.y = vector.y * scale;

		return output;
	}

	public static add<T extends Vector>(output: T, vector1: T, vector2: T): T {
		output.x = vector1.x + vector2.x;
		output.y = vector1.y + vector2.y;
		return output;
	}
}
