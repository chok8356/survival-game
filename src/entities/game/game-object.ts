import { Velocity } from '../../shared/types/velocity';

export class GameObject {
  x;
  y;
  radius;
  color;
  velocity;

  constructor(x: number, y: number, radius: number, color: string, velocity: Velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
