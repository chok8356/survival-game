export class MousePoint {
  private readonly mouse = {
    x: 0,
    y: 0,
  };

  get x() {
    return this.mouse.x;
  }

  get y() {
    return this.mouse.y;
  }

  constructor(window: Window) {
    window.addEventListener('pointermove', ({ clientX, clientY }: MouseEvent) => {
      this.mouse.x = clientX;
      this.mouse.y = clientY;
    });
  }
}
