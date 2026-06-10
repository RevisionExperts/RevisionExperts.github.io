# _Counter-Strike_
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

{% include arcade_sidebar.html %}

<div class="arcade-content-window" markdown="1">

<div class="game-page-header">
<h2>Counter-Strike</h2>
<p>Tactical first-person shooter gameplay</p>
</div>

<div class="game-content">
<canvas id="csGameCanvas" width="1000" height="600"></canvas>
<div class="game-ui">
  <div class="game-stats">
    <p>Health: <span id="healthValue">100</span>/100</p>
    <p>Ammo: <span id="ammoValue">30</span>/30</p>
    <p>Score: <span id="scoreValue">0</span></p>
  </div>
  <div class="game-controls">
    <p><strong>Controls:</strong> WASD - Move | Mouse - Aim | Click - Shoot | R - Reload | ESC - Menu</p>
  </div>
</div>
</div>

</div>

</div>

<style>
#csGameCanvas {
  border: 3px solid #1a1a1a;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: block;
  margin: 20px auto;
  cursor: crosshair;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.game-ui {
  text-align: center;
  color: #fff;
  font-family: 'Arial', sans-serif;
  background: #1a1a1a;
  padding: 15px;
  border-radius: 5px;
  margin-top: 15px;
}

.game-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  font-size: 18px;
}

.game-stats p {
  margin: 0;
  color: #ffcc00;
  font-weight: bold;
}

.game-controls {
  font-size: 14px;
  color: #ccc;
}

#healthValue {
  color: #00ff00;
}

#ammoValue {
  color: #ff6600;
}

#scoreValue {
  color: #ffff00;
}
</style>

<script>
const canvas = document.getElementById('csGameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let gameState = {
  running: true,
  paused: false
};

// Player object
const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 20,
  height: 30,
  speed: 6,
  vx: 0,
  vy: 0,
  health: 100,
  maxHealth: 100,
  ammo: 30,
  maxAmmo: 30,
  score: 0,
  weapon: 'rifle'
};

// Game variables
let enemies = [];
let bullets = [];
let particles = [];
let keys = {};
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Event listeners
document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
  if (e.key.toLowerCase() === 'r') reload();
  if (e.key.toLowerCase() === 'escape') togglePause();
});

document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('click', () => {
  if (!gameState.paused) shoot();
});

// Enemy class
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 18;
    this.height = 28;
    this.speed = 2.5 + Math.random();
    this.health = 30;
    this.maxHealth = 30;
    this.shootCooldown = 0;
  }

  update() {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }

    this.shootCooldown--;
    if (this.shootCooldown < 0 && distance < 400) {
      this.shootCooldown = 60;
      this.shoot();
    }
  }

  shoot() {
    const angle = Math.atan2(player.y - this.y, player.x - this.x);
    bullets.push(new Bullet(this.x, this.y, angle, true, 5));
  }

  draw() {
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    
    // Health bar
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 8, this.width, 4);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 8, (this.width * this.health) / this.maxHealth, 4);
  }
}

// Bullet class
class Bullet {
  constructor(x, y, angle, isEnemy = false, damage = 10) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = isEnemy ? 5 : 9;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.isEnemy = isEnemy;
    this.damage = damage;
    this.life = 500;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw() {
    ctx.fillStyle = this.isEnemy ? '#ff8844' : '#ffff00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Particle class
class Particle {
  constructor(x, y, vx, vy, color, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.life = life;
    this.maxLife = life;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // gravity
    this.life--;
  }

  draw() {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Functions
function shoot() {
  if (player.ammo > 0) {
    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    bullets.push(new Bullet(player.x, player.y, angle, false, 30));
    player.ammo--;
    createParticles(player.x, player.y, 3, '#ffcc00');
  }
}

function reload() {
  player.ammo = player.maxAmmo;
}

function togglePause() {
  gameState.paused = !gameState.paused;
}

function createParticles(x, y, count, color) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 3 + Math.random() * 3;
    particles.push(new Particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color, 30));
  }
}

function update() {
  if (gameState.paused) return;

  // Player movement
  player.vx = 0;
  player.vy = 0;

  if (keys['w']) player.vy -= player.speed;
  if (keys['s']) player.vy += player.speed;
  if (keys['a']) player.vx -= player.speed;
  if (keys['d']) player.vx += player.speed;

  player.x += player.vx;
  player.y += player.vy;

  // Boundary check
  if (player.x < 20) player.x = 20;
  if (player.x > canvas.width - 20) player.x = canvas.width - 20;
  if (player.y < 30) player.y = 30;
  if (player.y > canvas.height - 30) player.y = canvas.height - 30;

  // Update bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    if (bullets[i].life <= 0 || bullets[i].x < 0 || bullets[i].x > canvas.width || bullets[i].y < 0 || bullets[i].y > canvas.height) {
      bullets.splice(i, 1);
    }
  }

  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  // Spawn enemies
  if (Math.random() < 0.015 && enemies.length < 8) {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    if (side === 0) { x = Math.random() * canvas.width; y = -20; }
    else if (side === 1) { x = canvas.width + 20; y = Math.random() * canvas.height; }
    else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + 20; }
    else { x = -20; y = Math.random() * canvas.height; }
    enemies.push(new Enemy(x, y));
  }

  // Update enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();

    // Bullet collision
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (!bullets[j].isEnemy) {
        const dx = enemies[i].x - bullets[j].x;
        const dy = enemies[i].y - bullets[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 15) {
          enemies[i].health -= bullets[j].damage;
          createParticles(bullets[j].x, bullets[j].y, 5, '#ff6644');
          bullets.splice(j, 1);
          if (enemies[i].health <= 0) {
            player.score += 100;
            createParticles(enemies[i].x, enemies[i].y, 8, '#ff4444');
            enemies.splice(i, 1);
          }
          break;
        }
      }
    }

    // Player collision
    const dx = enemies[i].x - player.x;
    const dy = enemies[i].y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 25) {
      player.health -= 0.8;
      if (player.health <= 0) {
        gameState.running = false;
      }
    }
  }

  // Enemy bullet collision
  for (let j = bullets.length - 1; j >= 0; j--) {
    if (bullets[j].isEnemy) {
      const dx = player.x - bullets[j].x;
      const dy = player.y - bullets[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 20) {
        player.health -= bullets[j].damage;
        createParticles(bullets[j].x, bullets[j].y, 4, '#ff8844');
        bullets.splice(j, 1);
      }
    }
  }

  // Update UI
  document.getElementById('healthValue').textContent = Math.max(0, Math.floor(player.health));
  document.getElementById('ammoValue').textContent = player.ammo;
  document.getElementById('scoreValue').textContent = player.score;
}

function draw() {
  // Background
  ctx.fillStyle = '#2d5f3f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid
  ctx.strokeStyle = '#1a3a2a';
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += 50) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // Draw player
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

  // Draw weapon direction
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
  ctx.lineTo(player.x + Math.cos(angle) * 40, player.y + Math.sin(angle) * 40);
  ctx.stroke();

  // Draw enemies
  for (let enemy of enemies) {
    enemy.draw();
  }

  // Draw bullets
  for (let bullet of bullets) {
    bullet.draw();
  }

  // Draw particles
  for (let particle of particles) {
    particle.draw();
  }

  // Game over screen
  if (!gameState.running) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MISSION FAILED', canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillStyle = '#ffff00';
    ctx.font = '30px Arial';
    ctx.fillText('Final Score: ' + player.score, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillStyle = '#cccccc';
    ctx.font = '20px Arial';
    ctx.fillText('Reload page to play again', canvas.width / 2, canvas.height / 2 + 100);
  }

  // Pause screen
  if (gameState.paused) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#cccccc';
    ctx.fillText('Press ESC to Resume', canvas.width / 2, canvas.height / 2 + 50);
  }
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
</script>
