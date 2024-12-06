import { Velocity } from '../../shared/types/velocity';
import { GameObject } from './game-object';

const FRICTION = 0.99;

export class Particle extends GameObject {
  alpha;

  constructor(x: number, y: number, radius: number, color: string, velocity: Velocity, alpha = 1) {
    super(x, y, radius, color, velocity);
    this.alpha = alpha;
  }

  draw(c: CanvasRenderingContext2D) {
    c.save();
    c.globalAlpha = this.alpha;
    super.draw(c);
    c.restore();
  }

  update(c: CanvasRenderingContext2D) {
    super.update(c);
    this.velocity.x *= FRICTION;
    this.velocity.y *= FRICTION;
    this.alpha -= 0.01;
  }
}
