import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class RandomMovementComponent implements Component {
	name: string;
	public movementPeriod: number;
	public velocityOnX: number;
	public velocityOnY: number;

	constructor() {
		this.name = 'randomMovement';
		this.movementPeriod = Math.random() * 10 + 30;
		this.velocityOnX = - Math.random() * 5 - 1;
		this.velocityOnY = Math.random() + 2;
	}
}
