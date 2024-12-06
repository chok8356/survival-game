export class Enemy {
  radius: number = 10
  speed: number
  x: number
  y: number

  constructor(x: number, y: number, speed: number = 1) {
    this.x = x
    this.y = y
    this.speed = speed
  }

  avoidCollisions(enemies: Enemy[]): void {
    enemies.forEach((enemy) => {
      if (enemy === this) return

      const dx = enemy.x - this.x
      const dy = enemy.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 30) {
        const angle = Math.atan2(dy, dx)
        const pushDistance = 5

        this.x -= Math.cos(angle) * pushDistance
        this.y -= Math.sin(angle) * pushDistance
      }
    })
  }

  move(playerX: number, playerY: number, enemies: Enemy[]): void {
    const dx = playerX - this.x
    const dy = playerY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 0) {
      const moveX = (dx / distance) * this.speed
      const moveY = (dy / distance) * this.speed

      this.x += moveX
      this.y += moveY
    }

    this.avoidCollisions(enemies)
  }
}
