export class ScoreManager {
  private score: number = 0

  addPoints(points: number): void {
    this.score += points
  }

  getScore(): number {
    return this.score
  }

  reset(): void {
    this.score = 0
  }
}
