export class KeysManager {
  a = {
    pressed: false,
  };
  d = {
    pressed: false,
  };
  s = {
    pressed: false,
  };
  w = {
    pressed: false,
  };
  mouseLeftButton = {
    pressed: false,
  };

  constructor(window: Window) {
    window.addEventListener('keydown', ({ code }) => {
      switch (code) {
        case 'KeyA':
          this.a.pressed = true;
          break;
        case 'KeyD':
          this.d.pressed = true;
          break;
        case 'KeyS':
          this.s.pressed = true;
          break;
        case 'KeyW':
          this.w.pressed = true;
          break;
      }
    });

    window.addEventListener('keyup', ({ code }) => {
      switch (code) {
        case 'KeyA':
          this.a.pressed = false;
          break;
        case 'KeyD':
          this.d.pressed = false;
          break;
        case 'KeyS':
          this.s.pressed = false;
          break;
        case 'KeyW':
          this.w.pressed = false;
          break;
      }
    });

    window.addEventListener('mousedown', ({ button }) => {
      if (button === 0) {
        this.mouseLeftButton.pressed = true;
      }
    });

    window.addEventListener('mouseup', ({ button }) => {
      if (button === 0) {
        this.mouseLeftButton.pressed = false;
      }
    });
  }
}
