// ==================== BOOT SCENE ====================
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Show loading text
    const loadText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'LOADING...', {
      fontSize: '24px',
      fontFamily: 'monospace',
      color: '#ffffff'
    }).setOrigin(0.5);
  }

  create() {
    this._generatePlayerTexture();
    this._generateEnemyTextures();
    this._generateBossTextures();
    this._generateBulletTextures();
    this._generatePickupTextures();
    this._generateBackgroundTextures();
    this._generateParticleTexture();

    this.scene.start('MenuScene');
  }

  // ---- TEXTURE GENERATORS ----

  _generatePlayerTexture() {
    const w = CONFIG.PLAYER.SIZE_W;
    const h = CONFIG.PLAYER.SIZE_H;

    const g = this.add.graphics();
    // Fuselage body
    g.fillStyle(0x5a6b7a);
    g.fillRoundedRect(10, 12, 30, 8, 3);
    // Nose cone
    g.fillStyle(0x4a5b6a);
    g.fillTriangle(38, 12, 38, 20, 48, 16);
    // Wings top and bottom
    g.fillStyle(0x3d4f5f);
    g.fillRect(16, 4, 18, 8);
    g.fillRect(16, 20, 18, 8);
    // Cockpit window
    g.fillStyle(0x44ccff);
    g.fillRoundedRect(10, 14, 8, 4, 1);
    // Tail fin
    g.fillStyle(0x4a5b6a);
    g.fillTriangle(2, 6, 2, 26, 12, 20);
    g.fillTriangle(2, 6, 2, 26, 12, 12);
    // Engine glow
    g.fillStyle(0xff6622);
    g.fillCircle(14, 16, 3);
    g.generateTexture('player', w, h);
    g.destroy();
  }

  _generateEnemyTextures() {
    // Fighter - small aggressive plane shape
    let g = this.add.graphics();
    g.fillStyle(0xcc3333);
    g.fillTriangle(0, 0, 0, 22, 28, 11);
    g.fillStyle(0xaa2222);
    g.fillRect(8, 8, 12, 6);
    g.fillStyle(0xff6666);
    g.fillCircle(24, 11, 3);
    g.generateTexture('enemy_fighter', 30, 22);
    g.destroy();

    // Bomber - larger, wider shape
    g = this.add.graphics();
    g.fillStyle(0x884422);
    g.fillRoundedRect(4, 6, 36, 14, 3);
    g.fillStyle(0x663311);
    g.fillRect(0, 8, 10, 10);
    g.fillRect(12, 0, 28, 6);
    g.fillRect(12, 20, 28, 6);
    g.fillStyle(0xaaaaaa);
    g.fillCircle(40, 8, 3);
    g.fillCircle(40, 18, 3);
    g.generateTexture('enemy_bomber', 44, 28);
    g.destroy();

    // Turret - ground placement
    g = this.add.graphics();
    g.fillStyle(0x555555);
    g.fillRect(2, 14, 24, 12);
    g.fillStyle(0x777777);
    g.fillRect(8, 6, 12, 10);
    g.fillStyle(0x999999);
    g.fillRect(10, 0, 8, 8);
    g.generateTexture('enemy_turret', 28, 26);
    g.destroy();

    // Tank - wider ground unit
    g = this.add.graphics();
    g.fillStyle(0x446622);
    g.fillRect(0, 12, 40, 14);
    g.fillStyle(0x558833);
    g.fillRect(10, 4, 22, 10);
    g.fillStyle(0x77aa44);
    g.fillRect(14, 0, 14, 6);
    g.fillStyle(0x333333);
    g.fillCircle(8, 26, 5);
    g.fillCircle(32, 26, 5);
    g.generateTexture('enemy_tank', 40, 28);
    g.destroy();

    // Dark variants for stage 3
    g = this.add.graphics();
    g.fillStyle(0x883344);
    g.fillTriangle(0, 0, 0, 22, 28, 11);
    g.fillStyle(0x662233);
    g.fillRect(8, 8, 12, 6);
    g.fillStyle(0xff4488);
    g.fillCircle(24, 11, 3);
    g.generateTexture('enemy_fighter_dark', 30, 22);
    g.destroy();
  }

  _generateBossTextures() {
    // Boss 1: Gunship (large armored gunship)
    let g = this.add.graphics();
    g.fillStyle(0x445566);
    g.fillRoundedRect(10, 20, 100, 30, 5);
    // Armor plates
    g.fillStyle(0x556677);
    g.fillRect(20, 15, 80, 40);
    // Wings
    g.fillStyle(0x334455);
    g.fillRect(40, 0, 50, 20);
    g.fillRect(40, 50, 50, 20);
    // Guns
    g.fillStyle(0x888888);
    g.fillRect(105, 25, 15, 4);
    g.fillRect(105, 41, 15, 4);
    // Cockpit
    g.fillStyle(0x44ccff);
    g.fillRoundedRect(20, 28, 15, 14, 3);
    // Engines
    g.fillStyle(0xff4400);
    g.fillCircle(15, 22, 5);
    g.fillCircle(15, 48, 5);
    g.generateTexture('boss_gunship', 120, 70);
    g.destroy();

    // Boss 2: Flying Fortress
    g = this.add.graphics();
    g.fillStyle(0x665544);
    g.fillRoundedRect(0, 10, 130, 50, 6);
    g.fillStyle(0x776655);
    g.fillRect(10, 0, 110, 70);
    // Turrets
    g.fillStyle(0x888877);
    g.fillCircle(30, 10, 10);
    g.fillCircle(70, 10, 10);
    g.fillCircle(110, 10, 10);
    g.fillCircle(30, 60, 10);
    g.fillCircle(70, 60, 10);
    g.fillCircle(110, 60, 10);
    // Guns
    g.fillStyle(0x999999);
    g.fillRect(125, 22, 15, 3);
    g.fillRect(125, 32, 15, 3);
    g.fillRect(125, 42, 15, 3);
    // Core
    g.fillStyle(0xff8800);
    g.fillCircle(65, 35, 8);
    g.generateTexture('boss_fortress', 140, 70);
    g.destroy();

    // Boss 3: Super Fighter
    g = this.add.graphics();
    g.fillStyle(0x332244);
    g.fillRoundedRect(20, 16, 70, 22, 4);
    g.fillStyle(0x443366);
    g.fillTriangle(85, 16, 85, 38, 110, 27);
    // Wings
    g.fillStyle(0x221133);
    g.fillTriangle(40, 0, 20, 16, 60, 16);
    g.fillTriangle(40, 54, 20, 38, 60, 38);
    // Energy core
    g.fillStyle(0xcc44ff);
    g.fillCircle(40, 27, 6);
    // Guns
    g.fillStyle(0x666688);
    g.fillRect(100, 20, 12, 3);
    g.fillRect(100, 31, 12, 3);
    // Canards
    g.fillStyle(0x332244);
    g.fillTriangle(30, 10, 20, 2, 30, 6);
    g.fillTriangle(30, 44, 20, 52, 30, 48);
    g.generateTexture('boss_superfighter', 115, 55);
    g.destroy();
  }

  _generateBulletTextures() {
    // Player bullet (yellow)
    let g = this.add.graphics();
    g.fillStyle(0xffff44);
    g.fillRoundedRect(0, 0, CONFIG.BULLET.PLAYER_W, CONFIG.BULLET.PLAYER_H, 2);
    g.fillStyle(0xffffff);
    g.fillRoundedRect(2, 2, 4, 6, 1);
    g.generateTexture('bullet_player', CONFIG.BULLET.PLAYER_W, CONFIG.BULLET.PLAYER_H);
    g.destroy();

    // Enemy bullet (red/orange)
    g = this.add.graphics();
    g.fillStyle(0xff4422);
    g.fillCircle(4, 4, 4);
    g.fillStyle(0xffaa44);
    g.fillCircle(3, 3, 2);
    g.generateTexture('bullet_enemy', CONFIG.BULLET.ENEMY_W, CONFIG.BULLET.ENEMY_H);
    g.destroy();

    // Bomb icon (for HUD)
    g = this.add.graphics();
    g.fillStyle(0x333333);
    g.fillCircle(8, 10, 7);
    g.fillStyle(0x555555);
    g.fillRect(6, 0, 4, 8);
    g.fillStyle(0xff4400);
    g.fillCircle(10, 4, 2);
    g.generateTexture('icon_bomb', 16, 18);
    g.destroy();
  }

  _generatePickupTextures() {
    const pickups = [
      { key: 'pickup_speed', color: 0x44ff44 },
      { key: 'pickup_double_shot', color: 0x44aaff },
      { key: 'pickup_spread_shot', color: 0xff8844 },
      { key: 'pickup_laser', color: 0x4488ff },
      { key: 'pickup_bomb', color: 0xff4444 },
      { key: 'pickup_life', color: 0xff44ff },
    ];

    const size = 22;
    for (const p of pickups) {
      const g = this.add.graphics();
      // Outer glow
      g.fillStyle(p.color, 0.25);
      g.fillCircle(size / 2, size / 2, size / 2 + 2);
      // Main body
      g.fillStyle(p.color, 0.85);
      g.fillCircle(size / 2, size / 2, size / 2 - 1);
      // Border
      g.lineStyle(1.5, 0xffffff, 0.7);
      g.strokeCircle(size / 2, size / 2, size / 2 - 1);
      // Inner highlight
      g.fillStyle(0xffffff, 0.3);
      g.fillCircle(size / 2 - 3, size / 2 - 3, 4);
      g.generateTexture(p.key, size, size);
      g.destroy();
    }
  }

  _generateBackgroundTextures() {
    // Generate a simple cloud pattern
    const w = CONFIG.WIDTH + 200;

    // Generic sky gradient - will be tinted per stage
    let g = this.add.graphics();
    g.fillStyle(0x4488cc);
    g.fillRect(0, 0, w, CONFIG.HEIGHT);
    // Cloud-like shapes
    g.fillStyle(0xffffff, 0.2);
    for (let i = 0; i < 30; i++) {
      const cx = Phaser.Math.Between(0, w);
      const cy = Phaser.Math.Between(20, 300);
      const r = Phaser.Math.Between(30, 80);
      g.fillEllipse(cx, cy, r * 2, r);
    }
    g.generateTexture('bg_sky', w, CONFIG.HEIGHT);
    g.destroy();

    // Mountains / far terrain
    g = this.add.graphics();
    g.fillStyle(0x336644);
    g.fillRect(0, 0, w, 120);
    // Mountain silhouettes
    g.fillStyle(0x2a5533);
    for (let i = 0; i < 14; i++) {
      const mx = i * (w / 14);
      const mw = Phaser.Math.Between(40, 80);
      const mh = Phaser.Math.Between(40, 100);
      g.fillTriangle(mx, 120, mx + mw / 2, 120 - mh, mx + mw, 120);
    }
    g.fillStyle(0x1d4422);
    for (let i = 0; i < 10; i++) {
      const mx = Phaser.Math.Between(0, w);
      const mw = Phaser.Math.Between(50, 100);
      const mh = Phaser.Math.Between(30, 70);
      g.fillTriangle(mx, 120, mx + mw / 2, 120 - mh, mx + mw, 120);
    }
    g.generateTexture('bg_mountains', w, 130);
    g.destroy();

    // Ground / terrain
    g = this.add.graphics();
    g.fillStyle(0x3d7a3d);
    g.fillRect(0, 0, w, 130);
    // Grass variations
    g.fillStyle(0x4a8a3d, 0.5);
    for (let i = 0; i < 40; i++) {
      const gx = Phaser.Math.Between(0, w);
      const gy = Phaser.Math.Between(0, 40);
      g.fillRect(gx, gy, Phaser.Math.Between(10, 30), 3);
    }
    // Darker ground base
    g.fillStyle(0x2d5a1d);
    g.fillRect(0, 80, w, 50);
    // Road/line
    g.fillStyle(0x665544, 0.4);
    g.fillRect(0, 60, w, 4);
    g.generateTexture('bg_ground', w, 130);
    g.destroy();

    // Ocean ground for stage 3
    g = this.add.graphics();
    g.fillStyle(0x0a1a3a);
    g.fillRect(0, 0, w, 130);
    // Wave highlights
    g.fillStyle(0x113366, 0.5);
    for (let i = 0; i < 30; i++) {
      const wx = Phaser.Math.Between(0, w);
      const wy = Phaser.Math.Between(0, 40);
      g.fillRect(wx, wy, Phaser.Math.Between(20, 60), 2);
    }
    g.fillStyle(0x0c2d5a);
    g.fillRect(0, 80, w, 50);
    g.generateTexture('bg_ocean', w, 130);
    g.destroy();

    // Desert ground for stage 2
    g = this.add.graphics();
    g.fillStyle(0xc49a3c);
    g.fillRect(0, 0, w, 130);
    g.fillStyle(0xb8892b, 0.5);
    for (let i = 0; i < 30; i++) {
      const dx = Phaser.Math.Between(0, w);
      const dy = Phaser.Math.Between(0, 30);
      g.fillRect(dx, dy, Phaser.Math.Between(20, 50), 3);
    }
    g.fillStyle(0x8b6914);
    g.fillRect(0, 80, w, 50);
    g.generateTexture('bg_desert', w, 130);
    g.destroy();
  }

  _generateParticleTexture() {
    const g = this.add.graphics();
    g.fillStyle(0xffffff);
    g.fillCircle(4, 4, 4);
    g.generateTexture('particle', 8, 8);
    g.destroy();
  }
}

// ==================== MENU SCENE ====================
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Background
    this.cameras.main.setBackgroundColor('#0a0a2e');

    // Decorative stars
    for (let i = 0; i < 80; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, CONFIG.WIDTH),
        Phaser.Math.Between(0, CONFIG.HEIGHT),
        Phaser.Math.Between(1, 3),
        0xffffff,
        Phaser.Math.FloatBetween(0.3, 0.9)
      );
      this.tweens.add({
        targets: star,
        alpha: 0.1,
        duration: Phaser.Math.Between(500, 2000),
        yoyo: true,
        repeat: -1
      });
    }

    // Title
    this.add.text(CONFIG.WIDTH / 2, 130, 'SKY', {
      fontSize: '72px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ffcc00',
      stroke: '#553300',
      strokeThickness: 6,
      shadow: { offsetX: 4, offsetY: 4, color: '#000', blur: 8, fill: true }
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, 210, 'ASSAULT', {
      fontSize: '72px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ff6600',
      stroke: '#553300',
      strokeThickness: 6,
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 6, fill: true }
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(CONFIG.WIDTH / 2, 270, 'THE PHANTOM WAR', {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#aaaacc',
    }).setOrigin(0.5);

    // Plane silhouette decoration
    const planeG = this.add.graphics();
    planeG.fillStyle(0x335577);
    planeG.fillTriangle(350, 320, 350, 340, 400, 330);
    planeG.fillRect(400, 322, 30, 16);
    planeG.fillTriangle(430, 314, 430, 346, 460, 330);
    planeG.fillRect(410, 318, 10, 6);
    planeG.fillRect(410, 336, 10, 6);

    // Blinking start text
    const startText = this.add.text(CONFIG.WIDTH / 2, 420, 'PRESS ENTER OR CLICK TO START', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: startText,
      alpha: 0.2,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    // Controls info
    this.add.text(CONFIG.WIDTH / 2, 480, 'ARROWS / WASD - Move    SPACE / J - Shoot    K / SHIFT - Bomb    P - Pause', {
      fontSize: '11px',
      fontFamily: 'monospace',
      color: '#889999',
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, 540, 'Collect power-ups: S-Speed  D-Double  W-Spread  L-Laser  B-Bomb  1-Life', {
      fontSize: '11px',
      fontFamily: 'monospace',
      color: '#668877',
    }).setOrigin(0.5);

    // Input to start
    this.input.keyboard.once('keydown-ENTER', () => this._startGame());
    this.input.keyboard.once('keydown-SPACE', () => this._startGame());
    this.input.once('pointerdown', () => this._startGame());
  }

  _startGame() {
    // SFX hook: menu start sound
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.start('GameScene');
      }
    });
  }
}

// ==================== UI SCENE (HUD overlay) ====================
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.score = 0;
    this.lives = CONFIG.PLAYER.INITIAL_LIVES;
    this.bombs = CONFIG.PLAYER.MAX_BOMBS;
    this.activeWeapon = CONFIG.WEAPONS.BASIC;
    this.bossActive = false;
    this.bossHP = 0;
    this.currentStage = 1;

    this._createHUD();

    // Listen to game events
    const game = this.scene.get('GameScene');
    game.events.on('score-changed', (score) => { this.score = score; this._updateHUD(); });
    game.events.on('player-hit', () => { this.lives--; this._updateHUD(); });
    game.events.on('bomb-used', () => { this.bombs = Math.max(0, this.bombs - 1); this._updateHUD(); });
    game.events.on('weapon-changed', (w) => { this.activeWeapon = w; this._updateHUD(); });
    game.events.on('boss-spawned', (hp) => { this.bossActive = true; this.bossHP = hp; this.bossMaxHP = hp; this._updateHUD(); });
    game.events.on('boss-hp-changed', (hp) => { this.bossHP = hp; this._updateHUD(); });
    game.events.on('boss-defeated', () => { this.bossActive = false; this._updateHUD(); });
    game.events.on('stage-changed', (stage) => { this.currentStage = stage; this._updateHUD(); });
    game.events.on('player-respawn', (lives, bombs) => { this.lives = lives; this.bombs = bombs; this._updateHUD(); });
  }

  _createHUD() {
    const textStyle = {
      fontSize: '14px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    };

    const smallStyle = {
      fontSize: '11px',
      fontFamily: 'monospace',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1,
    };

    // Score
    this.scoreLabel = this.add.text(12, 8, 'SCORE', { ...smallStyle, color: '#ffcc00' });
    this.scoreText = this.add.text(12, 22, '0', { ...textStyle, fontSize: '16px' });

    // Lives
    this.livesText = this.add.text(12, 48, '', { ...textStyle, fontSize: '16px', color: '#ff4444' });

    // Bombs
    this.bombIcons = [];
    for (let i = 0; i < CONFIG.PLAYER.MAX_BOMBS; i++) {
      const icon = this.add.image(12 + i * 22, 78, 'icon_bomb').setOrigin(0, 0.5).setScale(1.2);
      this.bombIcons.push(icon);
    }

    // Weapon indicator
    this.add.text(12, 100, 'WEAPON', { ...smallStyle, color: '#44aaff' });
    this.weaponText = this.add.text(12, 114, 'BASIC', { ...textStyle, color: '#44aaff' });

    // Stage indicator
    this.stageText = this.add.text(CONFIG.WIDTH - 12, 8, 'STAGE 1', {
      ...textStyle, fontSize: '14px', color: '#ffaa00'
    }).setOrigin(1, 0);

    // Boss HP bar (hidden by default)
    this.bossBarBg = this.add.rectangle(CONFIG.WIDTH / 2, 24, 300, 10, 0x333333).setVisible(false);
    this.bossBarFill = this.add.rectangle(CONFIG.WIDTH / 2 - 148, 24, 296, 8, 0xff2222).setOrigin(0, 0.5).setVisible(false);
    this.bossBarBorder = this.add.rectangle(CONFIG.WIDTH / 2, 24, 300, 10).setStrokeStyle(1, 0xffffff).setVisible(false);
    this.bossLabel = this.add.text(CONFIG.WIDTH / 2, 10, 'BOSS', {
      ...textStyle, fontSize: '11px', color: '#ff4444'
    }).setOrigin(0.5).setVisible(false);
  }

  _updateHUD() {
    this.scoreText.setText(this.score.toString());

    // Lives as hearts/plane icons
    let livesStr = '';
    for (let i = 0; i < this.lives; i++) {
      livesStr += '< ';
    }
    this.livesText.setText(livesStr.trim());

    // Bombs
    for (let i = 0; i < this.bombIcons.length; i++) {
      this.bombIcons[i].setAlpha(i < this.bombs ? 1 : 0.25);
    }

    // Weapon
    const weaponNames = {
      basic: 'BASIC',
      double: 'DOUBLE',
      spread: 'SPREAD',
      laser: 'LASER',
    };
    this.weaponText.setText(weaponNames[this.activeWeapon] || 'BASIC');
    this.weaponText.setColor(
      this.activeWeapon === 'laser' ? '#44aaff' :
      this.activeWeapon === 'spread' ? '#ff8844' :
      this.activeWeapon === 'double' ? '#44ff44' : '#ffffff'
    );

    // Boss bar
    this.bossBarBg.setVisible(this.bossActive);
    this.bossBarFill.setVisible(this.bossActive);
    this.bossBarBorder.setVisible(this.bossActive);
    this.bossLabel.setVisible(this.bossActive);
    if (this.bossActive) {
      const percent = this.bossHP / this.bossMaxHP;
      this.bossBarFill.setScale(percent, 1);
      // Color changes based on HP
      if (percent < 0.3) {
        this.bossBarFill.setFillStyle(0xff2222);
      } else if (percent < 0.6) {
        this.bossBarFill.setFillStyle(0xff8800);
      } else {
        this.bossBarFill.setFillStyle(0xff4422);
      }
    }

    // Stage
    this.stageText.setText('STAGE ' + this.currentStage);
  }
}

// ==================== GAME SCENE ====================
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.score = 0;
    this.stageIndex = 0;
    this.stageTimer = 0;
    this.waveIndex = 0;
    this.waveTimer = 0;
    this.bossSpawned = false;
    this.bossDefeated = false;
    this.stageComplete = false;
    this.gameOver = false;
    this.paused = false;
    this.stageStarted = false;

    this._createParallax();
    this._createPlayer();
    this._createGroups();
    this._setupInput();
    this._setupCollisions();
    this._setupEvents();

    // Launch UI overlay
    this.scene.launch('UIScene');

    this._startStage(0);

    // SFX hooks
    this.bgmPlaying = false; // start music here
  }

  _createParallax() {
    // Get stage data for colors
    const stage = STAGES[this.stageIndex];
    this.cameras.main.setBackgroundColor(stage.bgColor1);

    // Far background - sky
    this.bgSky = this.add.tileSprite(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 'bg_sky')
      .setOrigin(0, 0)
      .setDepth(-3);
    this.bgSky.setTint(stage.bgColor2);

    // Mountains
    this.bgMountains = this.add.tileSprite(0, CONFIG.HEIGHT - 250, CONFIG.WIDTH, 130, 'bg_mountains')
      .setOrigin(0, 0)
      .setDepth(-2);
    this.bgMountains.setTint(stage.mountainColor);

    // Ground
    const groundKey = this.stageIndex === 2 ? 'bg_ocean' : (this.stageIndex === 1 ? 'bg_desert' : 'bg_ground');
    this.bgGround = this.add.tileSprite(0, CONFIG.HEIGHT - 120, CONFIG.WIDTH, 130, groundKey)
      .setOrigin(0, 0)
      .setDepth(-1);
  }

  _createPlayer() {
    this.player = new Player(this, 100, CONFIG.HEIGHT / 2 - 30);
    this.player.setDepth(5);
    this.player.setCollideWorldBounds(true);
    this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT - 120));
  }

  _createGroups() {
    // Player bullets (recycled via physics group get)
    this.playerBullets = this.physics.add.group({
      defaultKey: 'bullet_player',
      maxSize: 60,
      runChildUpdate: false,
    });

    // Enemy bullets
    this.enemyBullets = this.physics.add.group({
      defaultKey: 'bullet_enemy',
      maxSize: 80,
      runChildUpdate: false,
    });

    // Enemy fighters
    this.enemyFighters = this.physics.add.group({
      runChildUpdate: false,
    });

    // Enemy bombers
    this.enemyBombers = this.physics.add.group({
      runChildUpdate: false,
    });

    // Ground enemies
    this.enemyGrounds = this.physics.add.group({
      runChildUpdate: false,
    });

    // Pickups
    this.pickups = this.physics.add.group({
      runChildUpdate: false,
    });

    // Boss reference
    this.boss = null;
  }

  _setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.fireKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.bombKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.bombKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.pauseKey.on('down', () => this._togglePause());
  }

  _setupCollisions() {
    // Player bullets hit enemy fighters
    this.physics.add.overlap(this.playerBullets, this.enemyFighters, (bullet, enemy) => {
      if (!bullet.active || !enemy.active) return;
      const dmg = bullet.getData('damage') || 1;
      bullet.setActive(false); bullet.setVisible(false); bullet.body.enable = false;
      enemy.takeDamage(dmg);
    });

    // Player bullets hit enemy bombers
    this.physics.add.overlap(this.playerBullets, this.enemyBombers, (bullet, enemy) => {
      if (!bullet.active || !enemy.active) return;
      const dmg = bullet.getData('damage') || 1;
      bullet.setActive(false); bullet.setVisible(false); bullet.body.enable = false;
      enemy.takeDamage(dmg);
    });

    // Player bullets hit ground enemies
    this.physics.add.overlap(this.playerBullets, this.enemyGrounds, (bullet, enemy) => {
      if (!bullet.active || !enemy.active) return;
      const dmg = bullet.getData('damage') || 1;
      bullet.setActive(false); bullet.setVisible(false); bullet.body.enable = false;
      enemy.takeDamage(dmg);
    });

    // Player bullets hit boss
    // Added dynamically when boss spawns

    // Enemy bullets hit player
    this.physics.add.overlap(this.enemyBullets, this.player, (bullet, player) => {
      if (!bullet.active || !player.active) return;
      bullet.setActive(false); bullet.setVisible(false); bullet.body.enable = false;
      player.takeDamage();
    });

    // Enemies hit player (collision damage)
    this.physics.add.overlap(this.player, this.enemyFighters, (player, enemy) => {
      if (!player.active || !enemy.active) return;
      if (!player.isInvincible) {
        enemy.takeDamage(10); // destroy enemy on contact
        player.takeDamage();
      }
    });

    this.physics.add.overlap(this.player, this.enemyBombers, (player, enemy) => {
      if (!player.active || !enemy.active) return;
      if (!player.isInvincible) {
        enemy.takeDamage(10);
        player.takeDamage();
      }
    });

    // Player collects pickups
    this.physics.add.overlap(this.player, this.pickups, (player, pickup) => {
      if (!pickup.active || !player.active) return;
      player.activatePowerUp(pickup.getType());
      this.events.emit('weapon-changed', player.weaponType);
      this.events.emit('score-changed', this.score + CONFIG.SCORE.PICKUP);
      this.score += CONFIG.SCORE.PICKUP;
      pickup.destroy();
    });
  }

  _setupEvents() {
    this.events.on('enemy-killed', (scoreValue, x, y, enemyType) => {
      this.score += scoreValue;
      this.events.emit('score-changed', this.score);
      this._maybeDropPickup(x, y, enemyType);
    });

    this.events.on('player-hit', () => {
      this.events.emit('player-respawn', this.player.lives, this.player.bombs);
    });

    this.events.on('player-dead', () => {
      this.events.emit('player-respawn', 0, 0);
      this._handleGameOver();
    });

    this.events.on('bomb-used', () => {
      BombEffect.activate(this, this.player.x, this.player.y);
    });

    this.events.on('boss-defeated', () => {
      this.bossDefeated = true;
      this.score += CONFIG.SCORE.BOSS_KILL;
      this.events.emit('score-changed', this.score);
      this._completeStage();
    });
  }

  _startStage(index) {
    this.stageIndex = index;
    this.stageTimer = 0;
    this.waveIndex = 0;
    this.waveTimer = 0;
    this.bossSpawned = false;
    this.bossDefeated = false;
    this.stageComplete = false;
    this.stageStarted = false;

    // Clear any pending timed events from previous stage
    this.time.removeAllEvents();

    const stage = STAGES[index];

    // Update parallax colors
    this.cameras.main.setBackgroundColor(stage.bgColor1);
    if (this.bgSky) this.bgSky.setTint(stage.bgColor2);
    if (this.bgMountains) this.bgMountains.setTint(stage.mountainColor);
    const groundKey = index === 2 ? 'bg_ocean' : (index === 1 ? 'bg_desert' : 'bg_ground');
    if (this.bgGround) { this.bgGround.setTexture(groundKey); }

    // Clear any remaining enemies
    this._clearAllEnemies();
    if (this.player && this.player.active) {
      this.player.respawn(100, CONFIG.HEIGHT / 2 - 30);
    }

    this.events.emit('stage-changed', index + 1);

    // Stage intro text
    const stageText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'STAGE ' + (index + 1) + '\n' + stage.name, {
      fontSize: '32px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center',
    }).setOrigin(0.5).setDepth(100);

    this.tweens.add({
      targets: stageText,
      alpha: 0,
      delay: 1500,
      duration: 500,
      onComplete: () => {
        stageText.destroy();
        this.stageStarted = true;
        this._processWaves();
      }
    });

    // SFX hook: stage start jingle
  }

  _processWaves() {
    const stage = STAGES[this.stageIndex];
    const waves = stage.waves;

    // Schedule all waves
    for (const wave of waves) {
      this.time.addEvent({
        delay: wave.delay,
        callback: () => {
          if (this.stageComplete || this.gameOver || this.bossSpawned) return;
          this._spawnWave(wave);
        }
      });
    }

    // Schedule boss
    this.time.addEvent({
      delay: stage.bossDelay,
      callback: () => {
        if (this.stageComplete || this.gameOver) return;
        this._spawnBoss();
      }
    });
  }

  _spawnWave(wave) {
    if (this.stageComplete || this.gameOver || this.bossSpawned) return;

    const count = wave.count || 1;
    const interval = wave.interval || 500;
    const yBase = wave.yBase || 200;
    const ySpread = wave.ySpread || 100;

    for (let i = 0; i < count; i++) {
      this.time.addEvent({
        delay: i * interval,
        callback: () => {
          if (this.stageComplete || this.gameOver || this.bossSpawned) return;
          this._spawnEnemy(wave, i, count, yBase, ySpread);
        }
      });
    }
  }

  _spawnEnemy(wave, index, total, yBase, ySpread) {
    const stage = STAGES[this.stageIndex];
    const x = CONFIG.WIDTH + 40;

    if (wave.type === 'turret' || wave.type === 'tank') {
      // Ground enemy
      const texture = wave.type === 'tank' ? 'enemy_tank' : 'enemy_turret';
      const y = yBase + (ySpread ? Phaser.Math.Between(-ySpread / 2, ySpread / 2) : 0);
      // Clamp to ground area
      const groundY = Phaser.Math.Clamp(y, CONFIG.HEIGHT - 110, CONFIG.HEIGHT - 30);
      const enemy = new EnemyGround(this, x, groundY, texture);
      enemy.init(wave.type);
      enemy.setDepth(1);
      this.enemyGrounds.add(enemy);
    } else if (wave.type === 'bomber') {
      const y = yBase + (ySpread ? Phaser.Math.FloatBetween(-ySpread, ySpread) : 0);
      const enemy = new EnemyBomber(this, x, Phaser.Math.Clamp(y, 40, CONFIG.HEIGHT - 160));
      const speed = CONFIG.ENEMY.BOMBER_SPEED + (this.stageIndex * 10);
      enemy.init(wave.pattern || 'straight', speed);
      enemy.setDepth(2);
      this.enemyBombers.add(enemy);
    } else {
      // Fighter
      const formationOffset = this._getFormationOffset(wave.pattern, index, total, ySpread);
      const y = yBase + formationOffset;
      const clampedY = Phaser.Math.Clamp(y, 30, CONFIG.HEIGHT - 150);

      const darkSkin = this.stageIndex === 2;
      const texture = darkSkin ? 'enemy_fighter_dark' : 'enemy_fighter';
      const enemy = new EnemyFighter(this, x, clampedY, texture);

      const baseSpeed = Phaser.Math.Between(CONFIG.ENEMY.FIGHTER_SPEED_MIN, CONFIG.ENEMY.FIGHTER_SPEED_MAX);
      const speed = baseSpeed + (this.stageIndex * 15);
      const canShoot = wave.pattern !== 'formation_v' && wave.pattern !== 'formation_line';
      enemy.init(wave.pattern, canShoot, speed, ySpread);
      enemy.setDepth(2);
      this.enemyFighters.add(enemy);
    }
  }

  _getFormationOffset(pattern, index, total, spread) {
    if (pattern === 'formation_v') {
      const center = (total - 1) / 2;
      return Math.abs(index - center) * (spread / (total / 2)) * (total > 3 ? 1 : 1.5);
    }
    if (pattern === 'formation_line') {
      return (index - (total - 1) / 2) * (spread / total) * 2;
    }
    return spread ? Phaser.Math.FloatBetween(-spread, spread) : 0;
  }

  _spawnBoss() {
    if (this.bossSpawned || this.stageComplete || this.gameOver) return;
    this.bossSpawned = true;

    const stage = STAGES[this.stageIndex];
    const bossType = stage.bossType;

    // Clear remaining regular enemies for boss fight
    this._clearRegularEnemies();

    const boss = new Boss(this, CONFIG.WIDTH + 100, CONFIG.HEIGHT / 2 - 50, bossType);
    boss.setDepth(4);
    this.boss = boss;

    // Boss collision - NEVER destroy objects inside overlap callbacks
    this.physics.add.overlap(this.playerBullets, boss, (bullet, bossRef) => {
      if (!bullet.active || !boss.alive) return;
      const dmg = bullet.getData('damage') || 1;
      // Deactivate instead of destroy to avoid Phaser iteration corruption
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.body.enable = false;
      boss.takeDamage(dmg);
      this.events.emit('boss-hp-changed', boss.hp);
    });

    // Enemy bullet collisions with player (already set up via group)

    this.events.emit('boss-spawned', boss.hp);

    // SFX hook: boss warning sound
    const warnText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 60, 'WARNING!', {
      fontSize: '28px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ff2222',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(100);

    this.tweens.add({
      targets: warnText,
      alpha: 0,
      delay: 1200,
      duration: 300,
      onComplete: () => warnText.destroy()
    });
  }

  _maybeDropPickup(x, y, enemyType) {
    // Chance to drop power-up
    const chance = enemyType === 'air' ? 0.12 : 0.08;
    if (Math.random() > chance) return;

    const types = [
      CONFIG.PICKUPS.SPEED,
      CONFIG.PICKUPS.DOUBLE,
      CONFIG.PICKUPS.SPREAD,
      CONFIG.PICKUPS.LASER,
      CONFIG.PICKUPS.BOMB,
      CONFIG.PICKUPS.LIFE,
    ];

    // Weighted random: life is rare, bomb is semi-rare
    const weights = [0.2, 0.2, 0.2, 0.15, 0.15, 0.1];
    const type = this._weightedRandom(types, weights);

    const pickup = new Pickup(this, x, y, type);
    pickup.setDepth(3);
    this.pickups.add(pickup);
  }

  _weightedRandom(items, weights) {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  _completeStage() {
    this.stageComplete = true;

    const text = this.stageIndex < STAGES.length - 1
      ? 'STAGE ' + (this.stageIndex + 1) + ' CLEAR!'
      : 'ALL STAGES CLEAR!';

    const stageClearText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, text, {
      fontSize: '32px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ffcc00',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(100);

    // SFX hook: stage clear jingle

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        if (this.stageIndex < STAGES.length - 1) {
          this.cameras.main.fadeOut(600, 0, 0, 0);
          this.time.addEvent({
            delay: 700,
            callback: () => {
              stageClearText.destroy();
              this.cameras.main.fadeIn(600);
              this._startStage(this.stageIndex + 1);
            }
          });
        } else {
          this._handleVictory();
        }
      }
    });
  }

  _handleGameOver() {
    if (this.gameOver) return;
    this.gameOver = true;

    this.time.addEvent({
      delay: 1500,
      callback: () => {
        this.scene.stop('UIScene');
        this.scene.start('GameOverScene', {
          score: this.score,
          won: false,
          stage: this.stageIndex + 1,
        });
      }
    });
  }

  _handleVictory() {
    if (this.gameOver) return;
    this.gameOver = true;

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.scene.stop('UIScene');
        this.scene.start('GameOverScene', {
          score: this.score,
          won: true,
          stage: this.stageIndex + 1,
        });
      }
    });
  }

  _clearAllEnemies() {
    this._clearRegularEnemies();
    if (this.boss) {
      this.boss.destroy();
      this.boss = null;
    }
    this.bossSpawned = false;
    this.bossDefeated = false;
  }

  _clearRegularEnemies() {
    this.enemyFighters.clear(true, true);
    this.enemyBombers.clear(true, true);
    this.enemyGrounds.clear(true, true);
    this.playerBullets.clear(true, true);
    this.enemyBullets.clear(true, true);
    this.pickups.clear(true, true);
  }

  _togglePause() {
    if (this.gameOver) return;
    this.paused = !this.paused;

    if (this.paused) {
      this.physics.pause();
      this.pauseText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 40, 'PAUSED', {
        fontSize: '36px',
        fontFamily: 'monospace',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      }).setOrigin(0.5).setDepth(200);
      this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'Press P to resume', {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#cccccc',
      }).setOrigin(0.5).setDepth(200);
    } else {
      this.physics.resume();
      if (this.pauseText) { this.pauseText.destroy(); this.pauseText = null; }
      // Remove resume text
      this.children.list.forEach(c => {
        if (c.type === 'Text' && c.text === 'Press P to resume') c.destroy();
      });
    }
  }

  update(time, delta) {
    if (!this.stageStarted || this.paused || this.gameOver) return;

    // Scroll parallax backgrounds
    const speed = STAGES[this.stageIndex].scrollSpeed;
    if (this.bgSky) this.bgSky.tilePositionX += CONFIG.SCROLL.BACK * (delta / 1000);
    if (this.bgMountains) this.bgMountains.tilePositionX += CONFIG.SCROLL.MID * (delta / 1000);
    if (this.bgGround) this.bgGround.tilePositionX += CONFIG.SCROLL.FRONT * (delta / 1000);

    // Player movement and shooting
    if (this.player && this.player.active) {
      this.player.handleMovement(this.cursors, this.wasd);

      // Auto-fire while holding fire key
      if (this.fireKey.isDown || this.fireKey2.isDown) {
        this.player.shoot(time);
      }

      // Bomb
      if (Phaser.Input.Keyboard.JustDown(this.bombKey) || Phaser.Input.Keyboard.JustDown(this.bombKey2)) {
        if (this.player.useBomb(time)) {
          this.events.emit('bomb-used');
        }
      }
    }

    // Update enemy patterns
    this.enemyFighters.getChildren().forEach(enemy => {
      if (enemy.active) enemy.updatePattern(delta);
    });
    this.enemyBombers.getChildren().forEach(enemy => {
      if (enemy.active) enemy.updatePattern(delta);
    });
    this.enemyGrounds.getChildren().forEach(enemy => {
      if (enemy.active) enemy.updatePattern(delta);
    });

    // Update boss
    if (this.boss && this.boss.active && this.boss.alive) {
      this.boss.updateBoss(delta);
    }

    // Cleanup off-screen objects
    this._cleanupGroup(this.playerBullets, 60, true);
    this._cleanupGroup(this.enemyBullets, 60, true);
    this._cleanupGroup(this.enemyFighters, 80, false);
    this._cleanupGroup(this.enemyBombers, 80, false);
    this._cleanupGroup(this.enemyGrounds, 80, false);
    this._cleanupGroup(this.pickups, 60, false);
  }

  _cleanupGroup(group, margin, skipInactive) {
    group.getChildren().forEach(child => {
      if (!child) return;
      // Destroy inactive objects (except for pooled bullets)
      if (!child.active && !skipInactive) {
        child.destroy();
        return;
      }
      if (!child.active) return;
      if (child.x < -margin || child.x > CONFIG.WIDTH + margin ||
          child.y < -margin || child.y > CONFIG.HEIGHT + margin) {
        child.destroy();
      }
    });
  }
}

// ==================== GAME OVER / VICTORY SCENE ====================
class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.won = data.won || false;
    this.stageReached = data.stage || 1;
  }

  create() {
    this.cameras.main.setBackgroundColor('#0a0a1e');

    // Decorative stars
    for (let i = 0; i < 50; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, CONFIG.WIDTH),
        Phaser.Math.Between(0, CONFIG.HEIGHT),
        Phaser.Math.Between(1, 2),
        0xffffff,
        Phaser.Math.FloatBetween(0.2, 0.7)
      );
      this.tweens.add({
        targets: star,
        alpha: 0.05,
        duration: Phaser.Math.Between(800, 2500),
        yoyo: true,
        repeat: -1
      });
    }

    if (this.won) {
      this._showVictory();
    } else {
      this._showGameOver();
    }
  }

  _showVictory() {
    // Victory text
    this.add.text(CONFIG.WIDTH / 2, 100, 'MISSION COMPLETE', {
      fontSize: '40px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ffcc00',
      stroke: '#553300',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, 160, 'CONGRATULATIONS!', {
      fontSize: '22px',
      fontFamily: 'monospace',
      color: '#ffaa44',
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, 220, 'The enemy forces have been defeated.\nPeace is restored.', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#aaaacc',
      align: 'center',
    }).setOrigin(0.5);

    this._showScore(300);
    this._showRestart(400);

    // Victory animation: colored circles
    this.time.addEvent({
      delay: 300,
      repeat: 15,
      callback: () => {
        const c = this.add.circle(
          Phaser.Math.Between(100, CONFIG.WIDTH - 100),
          Phaser.Math.Between(50, 200),
          Phaser.Math.Between(5, 20),
          Phaser.Display.Color.HSLToColor(Phaser.Math.FloatBetween(0, 1), 0.7, 0.6).color,
          0.8
        );
        this.tweens.add({
          targets: c,
          y: c.y + 80,
          alpha: 0,
          duration: 1500,
          onComplete: () => c.destroy()
        });
      }
    });
  }

  _showGameOver() {
    this.add.text(CONFIG.WIDTH / 2, 120, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ff2222',
      stroke: '#440000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, 180, 'Your plane was shot down.', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#aa8888',
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, 210, 'Stage reached: ' + this.stageReached + ' / ' + STAGES.length, {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#888888',
    }).setOrigin(0.5);

    this._showScore(280);
    this._showRestart(380);
  }

  _showScore(y) {
    this.add.text(CONFIG.WIDTH / 2, y, 'FINAL SCORE', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#888888',
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, y + 28, this.finalScore.toString(), {
      fontSize: '28px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);
  }

  _showRestart(y) {
    const restartText = this.add.text(CONFIG.WIDTH / 2, y, 'PRESS ENTER TO PLAY AGAIN', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartText,
      alpha: 0.2,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    this.input.keyboard.once('keydown-ENTER', () => this._restart());
    this.input.keyboard.once('keydown-SPACE', () => this._restart());
    this.input.once('pointerdown', () => this._restart());
  }

  _restart() {
    this.scene.stop('UIScene');
    this.scene.start('GameScene');
  }
}
