export class Renderer {
  ctx: CanvasRenderingContext2D

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawBullet(x: number, y: number): void {
    this.ctx.beginPath()
    this.ctx.arc(x, y, 2, 0, Math.PI * 2)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
  }

  drawEnemy(x: number, y: number): void {
    this.ctx.beginPath()
    this.ctx.arc(x, y, 10, 0, Math.PI * 2)
    this.ctx.fillStyle = 'red'
    this.ctx.fill()
  }

  drawGameOver(score: number): void {
    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = 'red'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(`Game Over: ${score}`, this.canvas.width / 2, this.canvas.height / 2)
  }

  drawPlayer(x: number, y: number): void {
    this.ctx.beginPath()
    this.ctx.arc(x, y, 10, 0, Math.PI * 2)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
  }

  drawScore(score: number): void {
    this.ctx.font = '20px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'left'
    this.ctx.fillText(`Score: ${score}`, 10, 30)
  }

  drawTimer(time: number): void {
    const formattedTime = time.toFixed(1)
    this.ctx.font = '20px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'right'
    this.ctx.fillText(`Time: ${formattedTime}s`, this.canvas.width - 10, 30)
  }
}
