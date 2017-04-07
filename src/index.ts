import * as PIXI from 'pixi.js';

import Game from './Game';
import GameState from './GameState';
import MainState from './MainState';
import SplashscreenState from './SplashscreenState';

Game.create();

let gameState: GameState = new GameState('game');
let mainState: MainState = new MainState('main');
let splashscreenState: SplashscreenState = new SplashscreenState('splashscreen');

Game.switchToState('splashscreen');
