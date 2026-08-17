// ==================== PLAYER ====================
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.body.setSize(CONFIG.PLAYER.HITBOX_WIDTH, CONFIG.PLAYER.HITBOX_HEIGHT);
    this.body.setOffset(
      (CONFIG.PLAYER.SIZE_W - CONFIG.PLAYER.HITBOX_WIDTH) / 2,
      (CONFIG.PLAYER.SIZE_H - CONFIG.PLAYER.HITBOX_HEIGHT) / 2
    );

    this.lives = CONFIG.PLAYER.INITIAL_LIVES;
    this.bombs = CONFIG.PLAYER.MAX_BOMBS;
    this.maxBombs = CONFIG.PLAYER.MAX_BOMBS;
    this.weaponType = CONFIG.WEAPONS.BASIC;
    this.isInvincible = false;
    this.isLaserActive = false;
    this.laserTimer = null;
    this.spreadTimer = null;

    this.shootCooldown = CONFIG.PLAYER.SHOOT_COOLDOWN;
    this.lastShotTime = 0;
    this.lastBombTime = 0;
    this.moveSpeed = CONFIG.PLAYER.SPEED;

    // Audio hooks (connect SFX here)
    this.sfxShoot = null;
    this.sfxBomb = null;
    this.sfxHit = null;
    this.sfxPowerUp = null;
  }

  handleMovement(cursors, wasd) {
    const speed = this.moveSpeed;
    let vx = 0;
    let vy = 0;

    if (cursors.left.isDown || wasd.left.isDown) vx = -speed;
    if (cursors.right.isDown || wasd.right.isDown) vx = speed;
    if (cursors.up.isDown || wasd.up.isDown) vy = -speed;
    if (cursors.down.isDown || wasd.down.isDown) vy = speed;

    // Normalize diagonal movement
    if (vx !== 0 && vy !== 0) {
      const factor = Math.SQRT2 / 2;
      vx *= factor;
      vy *= factor;
    }

    this.setVelocity(vx, vy);

    // Tilt animation based on vertical movement
    if (vy < -20) {
      this.setAngle(-8);
    } else if (vy > 20) {
      this.setAngle(8);
    } else {
      this.setAngle(0);
    }
  }

  shoot(time) {
    if (time - this.lastShotTime < this.shootCooldown) return null;
    this.lastShotTime = time;

    const scene = this.scene;
    if (!scene || !scene.playerBullets) return null;

    const bullets = [];

    if (this.weaponType === CONFIG.WEAPONS.LASER || this.isLaserActive) {
      const b = scene.playerBullets.get(this.x + 30, this.y, 'bullet_player');
      if (b) {
        b.setData('damage', 2);
        b.setTint(0x44aaff);
        b.setScale(1, 1.5);
        b.setVelocity(CONFIG.BULLET.PLAYER_SPEED * 1.5, 0);
        bullets.push(b);
      }
      const b2 = scene.playerBullets.get(this.x + 30, this.y - 10, 'bullet_player');
      if (b2) {
        b2.setData('damage', 2);
        b2.setTint(0x44aaff);
        b2.setScale(1, 1.5);
        b2.setVelocity(CONFIG.BULLET.PLAYER_SPEED * 1.5, 0);
        bullets.push(b2);
      }
      const b3 = scene.playerBullets.get(this.x + 30, this.y + 10, 'bullet_player');
      if (b3) {
        b3.setData('damage', 2);
        b3.setTint(0x44aaff);
        b3.setScale(1, 1.5);
        b3.setVelocity(CONFIG.BULLET.PLAYER_SPEED * 1.5, 0);
        bullets.push(b3);
      }
      return bullets;
    }

    if (this.weaponType === CONFIG.WEAPONS.SPREAD) {
      const angles = [-0.3, -0.15, 0, 0.15, 0.3];
      for (const angle of angles) {
        const b = scene.playerBullets.get(this.x + 28, this.y, 'bullet_player');
        if (b) {
          b.setData('damage', 1);
          b.clearTint();
          b.setScale(1, 1);
          const vx = Math.cos(angle) * CONFIG.BULLET.PLAYER_SPEED;
          const vy = Math.sin(angle) * CONFIG.BULLET.PLAYER_SPEED;
          b.setVelocity(vx, vy);
          bullets.push(b);
        }
      }
      return bullets;
    }

    if (this.weaponType === CONFIG.WEAPONS.DOUBLE) {
      for (const offset of [-7, 7]) {
        const b = scene.playerBullets.get(this.x + 28, this.y + offset, 'bullet_player');
        if (b) {
          b.setData('damage', 1);
          b.clearTint();
          b.setScale(1, 1);
          b.setVelocity(CONFIG.BULLET.PLAYER_SPEED, 0);
          bullets.push(b);
        }
      }
      return bullets;
    }

    // Basic shot
    const b = scene.playerBullets.get(this.x + 28, this.y, 'bullet_player');
    if (b) {
      b.setData('damage', 1);
      b.clearTint();
      b.setScale(1, 1);
      b.setVelocity(CONFIG.BULLET.PLAYER_SPEED, 0);
      bullets.push(b);
    }
    // SFX hook: shoot sound
    return bullets;
  }

  useBomb(time) {
    if (this.bombs <= 0) return false;
    if (time - this.lastBombTime < CONFIG.PLAYER.BOMB_COOLDOWN) return false;
    this.lastBombTime = time;
    this.bombs--;
    // SFX hook: bomb sound
    return true;
  }

  takeDamage() {
    if (this.isInvincible) return false;

    this.lives--;
    this.scene.events.emit('player-hit');

    // SFX hook: hit sound

    if (this.lives <= 0) {
      this.scene.events.emit('player-dead');
      this.destroy();
      return true;
    }

    // Reset weapon on hit
    this.weaponType = CONFIG.WEAPONS.BASIC;
    this.isLaserActive = false;
    if (this.laserTimer) { this.laserTimer.remove(); this.laserTimer = null; }
    if (this.spreadTimer) { this.spreadTimer.remove(); this.spreadTimer = null; }

    // Brief invincibility
    this.startInvincibility();
    this.scene.events.emit('weapon-changed', this.weaponType);
    return false;
  }

  startInvincibility() {
    this.isInvincible = true;
    // Blink effect
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 0.3, to: 1 },
      duration: 120,
      repeat: Math.floor(CONFIG.PLAYER.INVINCIBILITY_MS / 240),
      yoyo: true,
      onComplete: () => {
        this.isInvincible = false;
        this.setAlpha(1);
      }
    });
  }

  activatePowerUp(type) {
    // Reset weapon timers
    if (this.laserTimer) { this.laserTimer.remove(); this.laserTimer = null; }
    if (this.spreadTimer) { this.spreadTimer.remove(); this.spreadTimer = null; }

    switch (type) {
      case CONFIG.PICKUPS.SPEED:
        this.moveSpeed = CONFIG.PLAYER.SPEED * 1.3;
        break;
      case CONFIG.PICKUPS.DOUBLE:
        this.weaponType = CONFIG.WEAPONS.DOUBLE;
        this.isLaserActive = false;
        break;
      case CONFIG.PICKUPS.SPREAD:
        this.weaponType = CONFIG.WEAPONS.SPREAD;
        this.isLaserActive = false;
        // Spread is temporary
        this.spreadTimer = this.scene.time.addEvent({
          delay: CONFIG.POWERUP.DURATION_SPREAD,
          callback: () => {
            if (this.weaponType === CONFIG.WEAPONS.SPREAD) {
              this.weaponType = CONFIG.WEAPONS.BASIC;
              this.scene.events.emit('weapon-changed', this.weaponType);
            }
          }
        });
        break;
      case CONFIG.PICKUPS.LASER:
        this.isLaserActive = true;
        this.weaponType = CONFIG.WEAPONS.LASER;
        this.laserTimer = this.scene.time.addEvent({
          delay: CONFIG.POWERUP.DURATION_LASER,
          callback: () => {
            this.isLaserActive = false;
            if (this.weaponType === CONFIG.WEAPONS.LASER) {
              this.weaponType = CONFIG.WEAPONS.BASIC;
              this.scene.events.emit('weapon-changed', this.weaponType);
            }
          }
        });
        break;
      case CONFIG.PICKUPS.BOMB:
        this.bombs = Math.min(this.bombs + 1, this.maxBombs);
        break;
      case CONFIG.PICKUPS.LIFE:
        this.lives = Math.min(this.lives + 1, CONFIG.PLAYER.MAX_LIVES);
        break;
    }
    // SFX hook: power-up sound
  }

  respawn(x, y) {
    this.setPosition(x, y);
    this.setVelocity(0, 0);
    this.weaponType = CONFIG.WEAPONS.BASIC;
    this.isLaserActive = false;
    this.isInvincible = false;
    this.bombs = CONFIG.PLAYER.MAX_BOMBS;
    this.moveSpeed = CONFIG.PLAYER.SPEED;
    this.startInvincibility();
    this.scene.events.emit('weapon-changed', this.weaponType);
  }
}

// ==================== ENEMY TYPES ====================

// Air enemy with movement patterns
class EnemyFighter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.hp = CONFIG.ENEMY.FIGHTER_HP;
    this.scoreValue = CONFIG.ENEMY.FIGHTER_SCORE;
    this.shootTimer = 0;
    this.canShoot = false;
    this.pattern = 'straight';
    this.patternData = {};
    this.startY = y;
    this.timeAlive = 0;
  }

  init(pattern, canShoot, speed, ySpread) {
    this.pattern = pattern;
    this.canShoot = canShoot;
    this.hp = CONFIG.ENEMY.FIGHTER_HP;
    this.startY = this.y;
    this.timeAlive = 0;
    this.shootTimer = Phaser.Math.Between(
      CONFIG.ENEMY.SHOOT_INTERVAL_MIN,
      CONFIG.ENEMY.SHOOT_INTERVAL_MAX
    );

    switch (pattern) {
      case 'straight':
        this.setVelocity(-speed, 0);
        break;
      case 'sine':
        this.setVelocity(-speed * 0.8, 0);
        this.patternData = { amplitude: ySpread || 40, frequency: 0.003 };
        break;
      case 'dive':
        this.setVelocity(-speed * 0.6, speed * 0.5);
        this.patternData = { reverseY: 400 };
        break;
      case 'formation_v':
      case 'formation_line':
        this.setVelocity(-speed * 0.7, 0);
        break;
      case 'zigzag':
        this.setVelocity(-speed * 0.7, 0);
        this.patternData = { vy: speed * 0.8, switchTime: 0, period: 800, dir: 1 };
        break;
      default:
        this.setVelocity(-speed, 0);
    }
  }

  updatePattern(delta) {
    this.timeAlive += delta;

    switch (this.pattern) {
      case 'sine':
        this.y = this.startY + Math.sin(this.timeAlive * this.patternData.frequency) * this.patternData.amplitude;
        break;
      case 'dive':
        if (this.y >= this.patternData.reverseY && this.body.velocity.y > 0) {
          this.setVelocityY(-120);
        }
        break;
      case 'zigzag':
        this.patternData.switchTime += delta;
        if (this.patternData.switchTime >= this.patternData.period) {
          this.patternData.switchTime = 0;
          this.patternData.dir *= -1;
          this.setVelocityY(this.patternData.vy * this.patternData.dir);
        }
        break;
      case 'formation_v':
      case 'formation_line':
        // Keep straight, slight drift
        break;
    }

    // Shoot if able
    if (this.canShoot && this.scene) {
      this.shootTimer -= delta;
      if (this.shootTimer <= 0) {
        this.shootTimer = Phaser.Math.Between(
          CONFIG.ENEMY.SHOOT_INTERVAL_MIN,
          CONFIG.ENEMY.SHOOT_INTERVAL_MAX
        );
        this.enemyShoot();
      }
    }
  }

  enemyShoot() {
    if (!this.scene || !this.scene.enemyBullets || !this.active) return;
    const b = this.scene.enemyBullets.get(this.x - 16, this.y, 'bullet_enemy');
    if (b) {
      b.setData('damage', 1);
      b.setVelocity(-CONFIG.BULLET.ENEMY_SPEED, 0);
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.scene.events.emit('enemy-killed', this.scoreValue, this.x, this.y, 'air');
      this.explode();
    }
  }

  explode() {
    if (!this.scene) return;
    const ex = this.scene.add.circle(this.x, this.y, 20, 0xffaa00, 1);
    this.scene.tweens.add({
      targets: ex,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 300,
      onComplete: () => ex.destroy()
    });
    this.setActive(false);
    this.setVisible(false);
    if (this.body) this.body.enable = false;
  }
}

// Bomber enemy - slower, more HP, can shoot
class EnemyBomber extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_bomber');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.hp = CONFIG.ENEMY.BOMBER_HP;
    this.scoreValue = CONFIG.ENEMY.BOMBER_SCORE;
    this.shootTimer = 0;
    this.pattern = 'straight';
    this.startY = y;
    this.timeAlive = 0;
    this.patternData = {};
  }

  init(pattern, speed) {
    this.pattern = pattern;
    this.hp = CONFIG.ENEMY.BOMBER_HP;
    this.startY = this.y;
    this.timeAlive = 0;
    this.setVelocity(-speed, 0);
    this.shootTimer = Phaser.Math.Between(1000, 2500);
    this.patternData = {
      vy: 60,
      switchTime: 0,
      period: 1200,
      dir: 1,
    };
  }

  updatePattern(delta) {
    this.timeAlive += delta;

    if (this.pattern === 'zigzag') {
      this.patternData.switchTime += delta;
      if (this.patternData.switchTime >= this.patternData.period) {
        this.patternData.switchTime = 0;
        this.patternData.dir *= -1;
        this.setVelocityY(this.patternData.vy * this.patternData.dir);
      }
    }

    // Shoot at player
    this.shootTimer -= delta;
    if (this.shootTimer <= 0 && this.scene && this.active) {
      this.shootTimer = Phaser.Math.Between(1200, 2800);
      if (this.scene.enemyBullets) {
        const b = this.scene.enemyBullets.get(this.x - 20, this.y, 'bullet_enemy');
        if (b) {
          b.setData('damage', 1);
          // Aim slightly toward player
          const player = this.scene.player;
          if (player && player.active) {
            const angle = Math.atan2(player.y - this.y, player.x - this.x);
            b.setVelocity(
              Math.cos(angle) * CONFIG.BULLET.ENEMY_SPEED,
              Math.sin(angle) * CONFIG.BULLET.ENEMY_SPEED
            );
          } else {
            b.setVelocity(-CONFIG.BULLET.ENEMY_SPEED, 0);
          }
        }
      }
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.scene.events.emit('enemy-killed', this.scoreValue, this.x, this.y, 'air');
      this.explode();
    }
  }

  explode() {
    if (!this.scene) return;
    const ex = this.scene.add.circle(this.x, this.y, 28, 0xff6600, 1);
    this.scene.tweens.add({
      targets: ex,
      scaleX: 4,
      scaleY: 4,
      alpha: 0,
      duration: 400,
      onComplete: () => ex.destroy()
    });
    this.setActive(false);
    this.setVisible(false);
    if (this.body) this.body.enable = false;
  }
}

// Ground enemy - turret/tank
class EnemyGround extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.body.allowGravity = false;
    this.hp = CONFIG.ENEMY.GROUND_HP;
    this.scoreValue = CONFIG.ENEMY.GROUND_SCORE;
    this.shootTimer = 0;
    this.groundType = 'turret';
  }

  init(type) {
    this.groundType = type;
    this.hp = type === 'tank' ? CONFIG.ENEMY.GROUND_HP + 1 : CONFIG.ENEMY.GROUND_HP;
    this.setVelocity(-CONFIG.SCROLL.BASE * 0.3, 0);
    this.shootTimer = Phaser.Math.Between(1500, 3000);
    return this;
  }

  updatePattern(delta) {
    this.shootTimer -= delta;
    if (this.shootTimer <= 0 && this.scene && this.active && this.x > 0 && this.x < CONFIG.WIDTH) {
      this.shootTimer = Phaser.Math.Between(1500, 3500);
      if (this.scene.enemyBullets) {
        const b = this.scene.enemyBullets.get(this.x, this.y - 12, 'bullet_enemy');
        if (b) {
          b.setData('damage', 1);
          // Shoot upward and slightly toward player
          const player = this.scene.player;
          const angle = player && player.active
            ? Math.atan2(player.y - this.y, player.x - this.x)
            : -Math.PI / 2;
          b.setVelocity(
            Math.cos(angle) * CONFIG.BULLET.ENEMY_SPEED * 1.3,
            Math.sin(angle) * CONFIG.BULLET.ENEMY_SPEED * 1.3
          );
        }
      }
    }

    // Remove if scrolled off screen
    if (this.x < -60) {
      this.destroy();
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.scene.events.emit('enemy-killed', this.scoreValue, this.x, this.y, 'ground');
      this.explode();
    }
  }

  explode() {
    if (!this.scene) return;
    const ex = this.scene.add.circle(this.x, this.y, 16, 0xff4400, 1);
    this.scene.tweens.add({
      targets: ex,
      scaleX: 3,
      scaleY: 2,
      alpha: 0,
      duration: 300,
      onComplete: () => ex.destroy()
    });
    this.setActive(false);
    this.setVisible(false);
    if (this.body) this.body.enable = false;
  }
}

// ==================== BOSS ====================
class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, 'boss_' + type);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.body.allowGravity = false;

    this.bossType = type;
    this.maxHP = 60;
    this.hp = 60;
    this.phase = 0;
    this.phaseTimer = 0;
    this.patternTimer = 0;
    this.isEntering = true;
    this.enterTargetX = 560;
    this.alive = true;

    this.shootTimers = [];
    this.patternIndex = 0;
    this.moveDir = 1;
    this.startY = y;
    this.timeAlive = 0;

    // Set up based on boss type
    this._setupType(type);
  }

  _setupType(type) {
    switch (type) {
      case 'gunship':
        // Stage 1 boss: large gunship
        this.maxHP = CONFIG.BOSS.HP_STAGE1;
        this.shootTimers = [1000, 2000, 3000];
        break;
      case 'fortress':
        // Stage 2 boss: flying fortress
        this.maxHP = CONFIG.BOSS.HP_STAGE2;
        this.shootTimers = [800, 1500, 2500];
        break;
      case 'superfighter':
        // Stage 3 boss: super fighter
        this.maxHP = CONFIG.BOSS.HP_STAGE3;
        this.shootTimers = [600, 1200, 2000, 3000];
        break;
    }
    this.hp = this.maxHP;
  }

  updateBoss(delta) {
    if (!this.active || !this.alive) return;

    this.timeAlive += delta;

    // Entry sequence
    if (this.isEntering) {
      this.setVelocity(-80, 0);
      if (this.x <= this.enterTargetX) {
        this.x = this.enterTargetX;
        this.setVelocity(0, 0);
        this.isEntering = false;
      }
      return;
    }

    // Phase-based behavior
    this.phaseTimer += delta;

    // Movement pattern
    this._updateMovement(delta);

    // Shooting patterns
    this._updateShooting(delta);

    // Phase transitions based on HP percentage
    const hpPercent = this.hp / this.maxHP;
    if (hpPercent < 0.3 && this.phase < 2) {
      this.phase = 2;
      this.phaseTimer = 0;
    } else if (hpPercent < 0.6 && this.phase < 1) {
      this.phase = 1;
      this.phaseTimer = 0;
    }
  }

  _updateMovement(delta) {
    const amplitude = 60;
    const frequency = 0.002;
    this.y = this.startY + Math.sin(this.timeAlive * frequency) * amplitude * (1 + this.phase * 0.5);
  }

  _updateShooting(delta) {
    for (let i = 0; i < this.shootTimers.length; i++) {
      this.shootTimers[i] -= delta;
      if (this.shootTimers[i] <= 0) {
        this.shootTimers[i] = 800 + i * 500 - this.phase * 150;
        this._firePattern(i);
      }
    }
  }

  _firePattern(slot) {
    if (!this.scene || !this.scene.enemyBullets) return;

    const eb = this.scene.enemyBullets;

    if (this.bossType === 'gunship') {
      switch (slot) {
        case 0: // Aimed shot
          this._aimedShot(eb);
          break;
        case 1: // Spread downward
          this._arcShot(eb, 3, Math.PI / 8, Math.PI / 2 + Math.PI / 8);
          break;
        case 2: // Fan pattern
          this._arcShot(eb, 5, Math.PI / 12, Math.PI);
          break;
      }
    } else if (this.bossType === 'fortress') {
      switch (slot) {
        case 0: // Double aimed
          this._aimedShot(eb, -15);
          this._aimedShot(eb, 15);
          break;
        case 1: // Radial burst
          this._radialShot(eb, 8);
          break;
        case 2: // Side spread
          this._arcShot(eb, 5, Math.PI / 10, Math.PI / 2 + Math.PI / 4);
          break;
      }
    } else if (this.bossType === 'superfighter') {
      switch (slot) {
        case 0: // Aimed
          this._aimedShot(eb);
          break;
        case 1: // Double wave
          this._arcShot(eb, 3, Math.PI / 10, 0);
          this._arcShot(eb, 3, Math.PI / 10, Math.PI);
          break;
        case 2: // Radial
          this._radialShot(eb, 12);
          break;
        case 3: // Fast aimed
          this._aimedShot(eb, -10);
          this._aimedShot(eb, 10);
          break;
      }
    }
  }

  _aimedShot(group, offsetY = 0) {
    const player = this.scene.player;
    if (!player || !player.active) {
      const b = group.get(this.x - 30, this.y + offsetY, 'bullet_enemy');
      if (b) { b.setData('damage', 1); b.setVelocity(-250, 0); }
      return;
    }
    const b = group.get(this.x - 30, this.y + offsetY, 'bullet_enemy');
    if (b) {
      b.setData('damage', 1);
      const angle = Math.atan2(player.y - (this.y + offsetY), player.x - this.x);
      b.setVelocity(Math.cos(angle) * 280, Math.sin(angle) * 280);
    }
  }

  _arcShot(group, count, spread, baseAngle) {
    const cx = this.x - 30;
    const cy = this.y;
    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (i - (count - 1) / 2) * spread / (count - 1) * 2;
      const b = group.get(cx, cy, 'bullet_enemy');
      if (b) {
        b.setData('damage', 1);
        b.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
      }
    }
  }

  _radialShot(group, count) {
    const cx = this.x - 30;
    const cy = this.y;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i;
      const b = group.get(cx, cy, 'bullet_enemy');
      if (b) {
        b.setData('damage', 1);
        b.setVelocity(Math.cos(angle) * 180, Math.sin(angle) * 180);
      }
    }
  }

  takeDamage(amount) {
    if (!this.alive) return;
    this.hp -= amount;

    // Flash white on hit
    this.setTint(0xffffff);
    this.scene.time.addEvent({
      delay: 60,
      callback: () => {
        if (this.active) this.clearTint();
      }
    });

    // SFX hook: boss hit sound

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.alive = false;
    this.setVelocity(0, 0);
    this.body.enable = false;

    // Big explosion sequence
    const exColors = [0xff4400, 0xff8800, 0xffcc00, 0xff6600, 0xff2200];
    const refX = this.x;
    const refY = this.y;
    for (let i = 0; i < 12; i++) {
      this.scene.time.addEvent({
        delay: i * 150,
        callback: () => {
          if (!this.scene) return;
          const ex = this.scene.add.circle(
            refX + Phaser.Math.Between(-50, 50),
            refY + Phaser.Math.Between(-40, 40),
            Phaser.Math.Between(20, 50),
            exColors[i % exColors.length],
            1
          );
          this.scene.tweens.add({
            targets: ex,
            scaleX: Phaser.Math.Between(2, 5),
            scaleY: Phaser.Math.Between(2, 5),
            alpha: 0,
            duration: Phaser.Math.Between(400, 800),
            onComplete: () => ex.destroy()
          });
        }
      });
    }

    // SFX hook: boss explosion sound

    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        if (this.scene) {
          this.scene.events.emit('boss-defeated');
        }
        this.destroy();
      }
    });
  }

  getHPPercent() {
    return Math.max(0, this.hp / this.maxHP);
  }
}

// ==================== PICKUP / POWER-UP ====================
class Pickup extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, 'pickup_' + type);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.pickupType = type;
    this.setVelocity(-50, CONFIG.POWERUP.FALL_SPEED);
    this.body.setAllowGravity(false);

    // Float animation
    scene.tweens.add({
      targets: this,
      y: y - 10,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  getType() {
    return this.pickupType;
  }
}

// ==================== BOMB EFFECT ====================
class BombEffect {
  static activate(scene, x, y) {
    // Screen flash
    const flash = scene.add.rectangle(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, CONFIG.WIDTH, CONFIG.HEIGHT, 0xffffff, 0.5);
    scene.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 500,
      onComplete: () => flash.destroy()
    });

    // Expanding circle
    const circle = scene.add.circle(x, y, 10, 0xffff00, 0.7);
    scene.tweens.add({
      targets: circle,
      scaleX: 25,
      scaleY: 25,
      alpha: 0,
      duration: 600,
      onComplete: () => circle.destroy()
    });

    // Damage all active enemies on screen
    if (scene.enemyFighters) {
      scene.enemyFighters.getChildren().forEach(e => {
        if (e.active) e.takeDamage(10);
      });
    }
    if (scene.enemyBombers) {
      scene.enemyBombers.getChildren().forEach(e => {
        if (e.active) e.takeDamage(10);
      });
    }
    if (scene.enemyGrounds) {
      scene.enemyGrounds.getChildren().forEach(e => {
        if (e.active) e.takeDamage(10);
      });
    }
    // Damage boss if active
    if (scene.boss && scene.boss.active && scene.boss.alive) {
      scene.boss.takeDamage(8);
      scene.events.emit('boss-hp-changed', scene.boss.hp);
    }
    // Clear enemy bullets
    if (scene.enemyBullets) {
      scene.enemyBullets.getChildren().forEach(b => {
        if (b.active) {
          const ex = scene.add.circle(b.x, b.y, 6, 0xffffff, 0.8);
          scene.tweens.add({ targets: ex, scaleX: 2, scaleY: 2, alpha: 0, duration: 200, onComplete: () => ex.destroy() });
          b.destroy();
        }
      });
    }
  }
}
