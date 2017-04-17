import { GameManager } from '../GameManager';

abstract class System {
	gameManager: GameManager;

	abstract update(delta: number): void;

	public addToGameManager(gameManager: GameManager): void {
		this.gameManager = gameManager;
	};
}

export { System };
