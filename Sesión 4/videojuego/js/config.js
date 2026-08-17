// Game configuration and constants
// Modify these values to tune difficulty, speed, and balance

const CONFIG = {
  WIDTH: 800,
  HEIGHT: 600,

  // Player
  PLAYER: {
    SPEED: 280,
    MAX_LIVES: 5,
    INITIAL_LIVES: 3,
    INVINCIBILITY_MS: 2000,
    SHOOT_COOLDOWN: 150,
    BOMB_COOLDOWN: 800,
    MAX_BOMBS: 3,
    HITBOX_WIDTH: 24,
    HITBOX_HEIGHT: 16,
    SIZE_W: 48,
    SIZE_H: 32,
  },

  // Bullets
  BULLET: {
    PLAYER_SPEED: 500,
    ENEMY_SPEED: 250,
    PLAYER_W: 10,
    PLAYER_H: 18,
    ENEMY_W: 8,
    ENEMY_H: 8,
  },

  // Enemies
  ENEMY: {
    FIGHTER_HP: 1,
    FIGHTER_SPEED_MIN: 80,
    FIGHTER_SPEED_MAX: 180,
    FIGHTER_SCORE: 100,
    BOMBER_HP: 4,
    BOMBER_SPEED: 60,
    BOMBER_SCORE: 300,
    GROUND_HP: 2,
    GROUND_SCORE: 150,
    SHOOT_INTERVAL_MIN: 1500,
    SHOOT_INTERVAL_MAX: 3500,
  },

  // Boss
  BOSS: {
    HP_STAGE1: 60,
    HP_STAGE2: 80,
    HP_STAGE3: 120,
  },

  // Power-ups
  POWERUP: {
    FALL_SPEED: 80,
    DURATION_LASER: 8000,
    DURATION_SPREAD: 10000,
  },

  // Scoring
  SCORE: {
    PICKUP: 50,
    BOSS_KILL: 5000,
    LIFE_BONUS: 1000,
  },

  // Parallax scroll speeds (pixels/sec)
  SCROLL: {
    BASE: 80,
    BACK: 20,
    MID: 45,
    FRONT: 90,
  },

  // Weapon types
  WEAPONS: {
    BASIC: 'basic',
    DOUBLE: 'double',
    SPREAD: 'spread',
    LASER: 'laser',
  },

  // Pickup types
  PICKUPS: {
    SPEED: 'speed',
    DOUBLE: 'double_shot',
    SPREAD: 'spread_shot',
    LASER: 'laser',
    BOMB: 'bomb',
    LIFE: 'life',
  },
};
