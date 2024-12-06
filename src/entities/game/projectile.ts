import { Velocity } from '../../shared/types/velocity';
import { GameObject } from './game-object';
import { Player } from './player';

export class Projectile extends GameObject {
  constructor(player: Player, velocity: Velocity) {
    super(player.x, player.y, 2, player.color, velocity);
  }
}
