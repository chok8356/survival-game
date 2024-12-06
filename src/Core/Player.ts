import { Bullet } from './Bullet'

export class Player {
  bullets: Bullet[]
  lastShotTime: number = 0 // Время последнего выстрела
  radius: number = 10
  screenHeight: number
  screenWidth: number
  shootCooldown: number = 150 // Задержка между выстрелами в миллисекундах
  speed: number

  x: number
  y: number

  constructor(x: number, y: number, screenWidth: number, screenHeight: number, speed: number = 2) {
    this.x = x
    this.y = y
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.speed = speed
    this.bullets = []
  }

  moveDown(): void {
    if (this.y + this.speed <= this.screenHeight) {
      this.y += this.speed
    }
  }

  moveLeft(): void {
    if (this.x - this.speed >= 0) {
      this.x -= this.speed
    }
  }

  moveRight(): void {
    if (this.x + this.speed <= this.screenWidth) {
      this.x += this.speed
    }
  }

  moveUp(): void {
    if (this.y - this.speed >= 0) {
      this.y -= this.speed
    }
  }

  shoot(angle: number): void {
    const currentTime = Date.now()

    if (currentTime - this.lastShotTime >= this.shootCooldown) {
      const playerX = this.x
      const playerY = this.y

      const bullet = new Bullet(playerX, playerY, angle)
      this.bullets.push(bullet)

      this.lastShotTime = currentTime
    }
  }

  updateBullets(): void {
    this.bullets.forEach((bullet) => bullet.update())
    this.bullets = this.bullets.filter(
      (bullet) =>
        bullet.x >= 0 &&
        bullet.x <= this.screenWidth &&
        bullet.y >= 0 &&
        bullet.y <= this.screenHeight,
    )
  }
}
