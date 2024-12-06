import { Enemy } from './Enemy.ts'

export class Bullet {
  radius: number = 2
  speed: number = 12
  velocityX: number
  velocityY: number
  x: number
  y: number

  constructor(playerX: number, playerY: number, angle: number) {
    this.x = playerX
    this.y = playerY

    this.velocityX = Math.cos(angle) * this.speed
    this.velocityY = Math.sin(angle) * this.speed
  }

  checkCollision(enemy: Enemy): boolean {
    const dx = this.x - enemy.x
    const dy = this.y - enemy.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < this.radius + enemy.radius
  }

  update(): void {
    this.x += this.velocityX
    this.y += this.velocityY
  }
}
