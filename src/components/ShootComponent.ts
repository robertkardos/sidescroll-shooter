import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class ShootComponent implements Component {
	name: string;
	isShooting: boolean;
	cooldown: number;
	cooldownCounter: number;

	constructor(cooldown: number) {
		this.name = 'shoot';
		this.isShooting = false;
		this.cooldown = cooldown;
		this.cooldownCounter = 0;
	}
}
