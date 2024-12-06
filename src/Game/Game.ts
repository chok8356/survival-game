import { Enemy } from '../Core/Enemy'
import { InputHandler } from '../Core/InputHandler'
import { Player } from '../Core/Player'
import { ScoreManager } from '../Core/ScoreManager'
import { Renderer } from '../Rendering/Renderer'

export class Game {
  elapsedTime: number = 0
  enemies: Enemy[] = []
  gameOver: boolean = false
  inputHandler: InputHandler
  lastSpawnTime: number = 0
  player: Player
  renderer: Renderer
  scoreManager: ScoreManager
  screenHeight: number
  screenWidth: number
  spawnInterval: number = 500

  constructor(
    renderer: Renderer,
    inputHandler: InputHandler,
    scoreManager: ScoreManager,
    screenWidth: number,
    screenHeight: number,
  ) {
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight

    this.player = new Player(
      this.screenWidth / 2,
      this.screenHeight / 2,
      this.screenWidth,
      this.screenHeight,
    )

    this.inputHandler = inputHandler
    this.renderer = renderer
    this.scoreManager = scoreManager
  }

  start(): void {
    this.scoreManager.reset()
    this.gameOver = false
    this.elapsedTime = 0

    let lastTime = 0

    const loop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      if (this.gameOver) {
        this.renderer.clear()
        this.renderer.drawGameOver(this.scoreManager.getScore())
        return
      }

      this.elapsedTime += deltaTime / 1000

      this.update(deltaTime)
      this.render()

      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
  }

  private checkPlayerCollision(enemy: Enemy): boolean {
    const dx = enemy.x - this.player.x
    const dy = enemy.y - this.player.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < enemy.radius + this.player.radius
  }

  private createRandomEnemy(): Enemy {
    const side = Math.floor(Math.random() * 4)
    let spawnX = Math.random() * this.screenWidth
    let spawnY = Math.random() * this.screenHeight

    if (side === 0) spawnY = -50 // Top
    if (side === 1) spawnY = this.screenHeight + 50 // Bottom
    if (side === 2) spawnX = -50 // Left
    if (side === 3) spawnX = this.screenWidth + 50 // Right

    return new Enemy(spawnX, spawnY)
  }

  private handleBulletCollisions(): void {
    this.player.bullets.forEach((bullet, bulletIndex) => {
      this.enemies.forEach((enemy, enemyIndex) => {
        if (bullet.checkCollision(enemy)) {
          this.scoreManager.addPoints(1)
          this.enemies.splice(enemyIndex, 1)
          this.player.bullets.splice(bulletIndex, 1)
        }
      })
    })
  }

  private handlePlayerInput(): void {
    if (this.inputHandler.isKeyPressed('KeyA')) this.player.moveLeft()
    if (this.inputHandler.isKeyPressed('KeyD')) this.player.moveRight()
    if (this.inputHandler.isKeyPressed('KeyW')) this.player.moveUp()
    if (this.inputHandler.isKeyPressed('KeyS')) this.player.moveDown()

    if (this.inputHandler.isMousePressed()) {
      const { x, y } = this.inputHandler.getMousePosition()
      const angle = Math.atan2(y - this.player.y, x - this.player.x)
      this.player.shoot(angle)
    }
  }

  private render(): void {
    this.renderer.clear()
    this.renderer.drawScore(this.scoreManager.getScore())
    this.renderer.drawTimer(this.elapsedTime)
    this.renderer.drawPlayer(this.player.x, this.player.y)

    this.enemies.forEach((enemy) => {
      this.renderer.drawEnemy(enemy.x, enemy.y)
    })

    this.player.bullets.forEach((bullet) => {
      this.renderer.drawBullet(bullet.x, bullet.y)
    })
  }

  private spawnEnemies(deltaTime: number): void {
    this.lastSpawnTime += deltaTime
    if (this.lastSpawnTime >= this.spawnInterval) {
      this.lastSpawnTime = 0
      const enemy = this.createRandomEnemy()
      this.enemies.push(enemy)
    }
  }

  private update(deltaTime: number): void {
    this.handlePlayerInput()
    this.spawnEnemies(deltaTime)
    this.updateEnemies()
    this.player.updateBullets()
    this.handleBulletCollisions()
  }

  private updateEnemies(): void {
    this.enemies.forEach((enemy) => {
      enemy.move(this.player.x, this.player.y, this.enemies)
      if (this.checkPlayerCollision(enemy)) {
        this.gameOver = true
      }
    })
  }
}
