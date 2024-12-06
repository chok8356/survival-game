import { wait } from '../../shared/lib/wait';
import { GameObject } from './game-object';

export class Player extends GameObject {
  speed = 2;

  attackSpeed = 250;

  private canAttack = true;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas.width / 2, canvas.height / 2, 10, 'white', { x: 0, y: 0 });
  }

  // Movement
  moveForward() {
    this.velocity.y = -this.speed;
  }

  moveBack() {
    this.velocity.y = this.speed;
  }

  moveLeft() {
    this.velocity.x = -this.speed;
  }

  moveRight() {
    this.velocity.x = this.speed;
  }

  moveStop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  //   Attack
  get isCanAttack() {
    return this.canAttack;
  }

  async attack() {
    if (!this.canAttack) return;
    // reloading
    this.canAttack = false;
    await wait(this.attackSpeed);
    this.canAttack = true;
  }
}
