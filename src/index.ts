import * as PIXI from 'pixi.js';

import Game from './Game';
import GameState from './GameState';
import MainState from './MainState';
import SplashscreenState from './SplashscreenState';

import Ship from './Ship';

Game.create();

let gameState: GameState = new GameState('game');
let mainState: MainState = new MainState('main');
let splashscreenState: SplashscreenState = new SplashscreenState('splashscreen');

let ship = new Ship();

Game.switchToState('splashscreen');
Game.app.stage.addChild(ship);
