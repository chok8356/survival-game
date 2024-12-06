import { GameObject } from './game-object';

export class Enemy extends GameObject {
  constructor(canvas: HTMLCanvasElement) {
    const radius = Math.random() * (60 - 30) + 30;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    super(x, y, radius, `hsl(${Math.random() * 360}, 50%, 50%)`, {
      x: 0,
      y: 0,
    });
  }

  draw(c: CanvasRenderingContext2D) {
    super.draw(c);
    c.font = `${this.radius}px monospace`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = 'white';
    c.fillText(this.radius.toFixed(0), this.x, this.y);
  }
}
