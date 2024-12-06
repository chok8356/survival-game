export class InputHandler {
  keys: Record<string, boolean> = {}
  mouseDown: boolean = false
  mouseX: number = 0
  mouseY: number = 0

  constructor() {
    window.addEventListener('keydown', (e) => (this.keys[e.code] = true))
    window.addEventListener('keyup', (e) => (this.keys[e.code] = false))

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    })

    window.addEventListener('mousedown', () => (this.mouseDown = true))
    window.addEventListener('mouseup', () => (this.mouseDown = false))
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY }
  }

  isKeyPressed(key: string): boolean {
    return this.keys[key]
  }

  isMousePressed(): boolean {
    return this.mouseDown
  }
}
