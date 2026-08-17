// Main entry point - Phaser 3 game initialization
// Architecture allows easy extension: add new stages in stages.js,
// new enemy types in entities.js, new scenes in scenes.js

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: CONFIG.WIDTH,
  height: CONFIG.HEIGHT,
  parent: 'game-container',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, GameScene, UIScene, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: false,
    antialias: true,
  },
});

// Launch UI scene alongside Game scene when game starts
// (handled internally via scene events)

// SFX connect points:
// - Add sound assets in BootScene preload
// - Uncomment sfx hooks in Player, Boss, BombEffect, and scene transition methods
// - Example: this.sfxShoot = this.sound.add('shoot'); this.sfxShoot.play();
