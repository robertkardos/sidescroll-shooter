import * as PIXI from 'pixi.js';

import { Component } from './Component';

export class MomentumComponent implements Component {
	name: string;
	rateOfLosingMomentum: number;

	constructor(rateOfLosingMomentum: number) {
		this.name = 'momentum';
		this.rateOfLosingMomentum = rateOfLosingMomentum;
	}
}
