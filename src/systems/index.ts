import { CollisionSystem as Collision } from './CollisionSystem';
import { DestroyWhenOffTheMapSystem as DestroyWhenOffTheMap } from './DestroyWhenOffTheMapSystem';
import { DrawSystem as Draw } from './DrawSystem';
import { EnemySpawnerSystem as EnemySpawner } from './EnemySpawnerSystem';
import { FadeOutSystem as FadeOut } from './FadeOutSystem';
import { KeepOnScreenSystem as KeepOnScreen } from './KeepOnScreenSystem';
import { KeyboardMovementSystem as KeyboardMovement } from './KeyboardMovementSystem';
import { MomentumSystem as Momentum } from './MomentumSystem';
import { MovementSystem as Movement } from './MovementSystem';
import { RandomMovementSystem as RandomMovement } from './RandomMovementSystem';
import { ScrollSystem as Scroll } from './ScrollSystem';
import { ShootSystem as Shoot } from './ShootSystem';
import { StopWhenPlayerIsDeadSystem as StopWhenPlayerIsDead } from './StopWhenPlayerIsDeadSystem';

export let Systems = {
	Collision,
	DestroyWhenOffTheMap,
	Draw,
	EnemySpawner,
	FadeOut,
	KeepOnScreen,
	KeyboardMovement,
	Momentum,
	Movement,
	RandomMovement,
	Scroll,
	Shoot,
	StopWhenPlayerIsDead
}
