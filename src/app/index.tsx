import { animate } from 'motion';
import { createMemo, createSignal, onMount, Show } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { KeysManager } from '../entities/environment/keys-manager';
import { MousePoint } from '../entities/environment/mouse-point';
import { Enemy } from '../entities/game/enemy';
import { Particle } from '../entities/game/particle';
import { Player } from '../entities/game/player';
import { Projectile } from '../entities/game/projectile';
import styles from './index.module.scss';
import './index.scss';

export const App = () => {
  let canvas!: HTMLCanvasElement;

  const [score, setScore] = createSignal(0);

  const [animationId, setAnimationId] = createSignal(0);

  const displayedScore = createMemo(() => score().toFixed(0));

  const isGameEnd = createMemo(() => animationId() === 0);

  onMount(() => {
    const c = canvas.getContext('2d') || null;
    if (c === null) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keys = new KeysManager(window);

    const mousePoint = new MousePoint(window);

    const player = new Player(canvas);

    const projectiles: Projectile[] = [];
    const enemies: Enemy[] = [];
    const particles: Particle[] = [];

    function spawnEnemies() {
      if (canvas === null) return;
      setInterval(() => enemies.push(new Enemy(canvas)), 1000);
    }

    function animateLoop() {
      if (canvas === null) return;
      if (c === null) return;

      setAnimationId(requestAnimationFrame(animateLoop));

      c.fillStyle = 'rgba(0, 0, 0, 0.5)';
      c.fillRect(0, 0, canvas.width, canvas.height);

      player.draw(c);

      player.moveStop();
      if (keys.a.pressed && player.x - player.radius > 0) player.moveLeft();
      if (keys.d.pressed && player.x + player.radius < canvas.width) player.moveRight();
      if (keys.w.pressed && player.y - player.radius > 0) player.moveForward();
      if (keys.s.pressed && player.y + player.radius < canvas.height) player.moveBack();
      player.update(c);

      if (keys.mouseLeftButton.pressed) {
        if (player.isCanAttack) {
          player.attack();
          const { x, y } = mousePoint;
          const angle = Math.atan2(y - player.y, x - player.x);
          projectiles.push(
            new Projectile(player, {
              x: Math.cos(angle) * 10,
              y: Math.sin(angle) * 10,
            }),
          );
        }
      }

      projectiles.forEach((projectile, projectileIndex) => {
        projectile.update(c);
        const { x, y, radius } = projectile;
        if (
          x + radius < 0 ||
          x - radius > canvas.width ||
          y + radius < 0 ||
          y - radius > canvas.height
        ) {
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      });

      enemies.forEach((enemy, enemyIndex) => {
        enemy.update(c);

        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        enemy.velocity.x = Math.cos(angle) / 2;
        enemy.velocity.y = Math.sin(angle) / 2;

        // end game
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist - enemy.radius - player.radius < 1) {
          cancelAnimationFrame(animationId());
          setAnimationId(0);
        }

        projectiles.forEach((projectile, projectileIndex) => {
          const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

          // when projectile touch enemy
          if (dist - enemy.radius - projectile.radius < 1) {
            for (let i = 0; i < enemy.radius * 2; i++) {
              particles.push(
                new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
                  x: (Math.random() - 0.5) * (Math.random() * 6),
                  y: (Math.random() - 0.5) * (Math.random() * 6),
                }),
              );
            }

            const damage = 10;
            if (enemy.radius - damage > damage) {
              const { radius } = enemy;
              animate(
                (progress) => {
                  enemy.radius = radius - progress * damage;
                },
                { duration: 0.1 },
              );
              setScore(score() + damage);
              setTimeout(() => {
                projectiles.splice(projectileIndex, 1);
              }, 0);
            } else {
              setScore(score() + enemy.radius);
              setTimeout(() => {
                enemies.splice(enemyIndex, 1);
                projectiles.splice(projectileIndex, 1);
              }, 0);
            }
          }
        });
      });

      particles.forEach((particle, particleIndex) => {
        if (particle.alpha <= 0) {
          setTimeout(() => {
            particles.splice(particleIndex, 1);
          }, 0);
        } else {
          particle.update(c);
        }
      });
    }

    animateLoop();
    spawnEnemies();
  });

  return (
    <div class={styles.app}>
      <Transition name="slide-fade">
        <Show when={isGameEnd()}>
          <div class={styles.ui}>{displayedScore()}</div>
        </Show>
      </Transition>

      <Show when={!isGameEnd()}>
        <div class={styles.score}>{displayedScore()}</div>
      </Show>

      <canvas
        ref={canvas}
        class={styles.canvas}
      />
    </div>
  );
};
