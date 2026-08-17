// Stage wave definitions
// Each stage is an array of wave groups executed sequentially
// Modify or add stages here to extend the game

const STAGES = [
  // ==================== STAGE 1: European Coast / Countryside ====================
  {
    name: 'EUROPEAN COAST',
    bgColor1: 0x4a90d9,  // sky blue
    bgColor2: 0x87ceeb,
    groundColor: 0x3d7a3d,
    groundColor2: 0x5a9e4b,
    mountainColor: 0x4a6741,
    cloudColor: 0xffffff,
    scrollSpeed: 80,
    waves: [
      // Intro wave - easy
      { type: 'fighter', pattern: 'straight', count: 3, interval: 800, delay: 1000, yBase: 150, ySpread: 100 },
      { type: 'fighter', pattern: 'straight', count: 2, interval: 600, delay: 2000, yBase: 250, ySpread: 80 },
      // Ground targets
      { type: 'turret', pattern: 'ground', count: 2, interval: 1200, delay: 3000, yBase: 520, ySpread: 0 },
      // Formation
      { type: 'fighter', pattern: 'formation_v', count: 5, interval: 300, delay: 4500, yBase: 100, ySpread: 60 },
      // Mixed
      { type: 'fighter', pattern: 'sine', count: 3, interval: 700, delay: 6000, yBase: 200, ySpread: 120 },
      { type: 'bomber', pattern: 'straight', count: 2, interval: 1000, delay: 7000, yBase: 120, ySpread: 60 },
      // More ground
      { type: 'tank', pattern: 'ground', count: 3, interval: 900, delay: 8000, yBase: 530, ySpread: 0 },
      // Medium wave
      { type: 'fighter', pattern: 'dive', count: 4, interval: 500, delay: 10000, yBase: 100, ySpread: 150 },
      { type: 'fighter', pattern: 'straight', count: 4, interval: 400, delay: 11500, yBase: 250, ySpread: 100 },
      { type: 'bomber', pattern: 'straight', count: 1, interval: 0, delay: 12500, yBase: 150, ySpread: 0 },
      // Pre-boss
      { type: 'fighter', pattern: 'formation_line', count: 6, interval: 250, delay: 14000, yBase: 130, ySpread: 100 },
      { type: 'turret', pattern: 'ground', count: 4, interval: 500, delay: 14500, yBase: 520, ySpread: 0 },
      // BREAK before boss at ~17000ms
    ],
    bossDelay: 18000,
    bossHP: CONFIG.BOSS.HP_STAGE1,
    bossType: 'gunship',
    stageDuration: 25000,
  },

  // ==================== STAGE 2: Desert / Mountains ====================
  {
    name: 'ARID DESERT',
    bgColor1: 0xc97e3a,
    bgColor2: 0xe8c170,
    groundColor: 0xc49a3c,
    groundColor2: 0xa0752a,
    mountainColor: 0x8b6914,
    cloudColor: 0xf5deb3,
    scrollSpeed: 90,
    waves: [
      // Start harder
      { type: 'fighter', pattern: 'dive', count: 4, interval: 500, delay: 1000, yBase: 120, ySpread: 120 },
      { type: 'fighter', pattern: 'sine', count: 3, interval: 600, delay: 2500, yBase: 180, ySpread: 100 },
      // Ground + air mix
      { type: 'tank', pattern: 'ground', count: 2, interval: 800, delay: 3500, yBase: 530, ySpread: 0 },
      { type: 'fighter', pattern: 'formation_v', count: 6, interval: 250, delay: 4000, yBase: 100, ySpread: 80 },
      // Bombers
      { type: 'bomber', pattern: 'straight', count: 3, interval: 900, delay: 5500, yBase: 100, ySpread: 80 },
      { type: 'bomber', pattern: 'zigzag', count: 2, interval: 1000, delay: 6500, yBase: 150, ySpread: 60 },
      // Heavy wave
      { type: 'fighter', pattern: 'straight', count: 5, interval: 350, delay: 8000, yBase: 200, ySpread: 140 },
      { type: 'turret', pattern: 'ground', count: 3, interval: 600, delay: 8500, yBase: 520, ySpread: 0 },
      { type: 'fighter', pattern: 'dive', count: 4, interval: 450, delay: 9500, yBase: 100, ySpread: 120 },
      // Formation
      { type: 'fighter', pattern: 'formation_line', count: 7, interval: 200, delay: 11000, yBase: 130, ySpread: 100 },
      { type: 'bomber', pattern: 'straight', count: 2, interval: 700, delay: 12000, yBase: 180, ySpread: 50 },
      // Pre-boss
      { type: 'fighter', pattern: 'sine', count: 4, interval: 400, delay: 13500, yBase: 200, ySpread: 140 },
      { type: 'tank', pattern: 'ground', count: 5, interval: 400, delay: 14000, yBase: 530, ySpread: 0 },
    ],
    bossDelay: 17000,
    bossHP: CONFIG.BOSS.HP_STAGE2,
    bossType: 'fortress',
    stageDuration: 24000,
  },

  // ==================== STAGE 3: Ocean / Night Combat ====================
  {
    name: 'MIDNIGHT OCEAN',
    bgColor1: 0x0a1a3a,
    bgColor2: 0x152840,
    groundColor: 0x0c2d5a,
    groundColor2: 0x0f3060,
    mountainColor: 0x1a2a4a,
    cloudColor: 0x334466,
    scrollSpeed: 100,
    waves: [
      // Aggressive start
      { type: 'fighter', pattern: 'dive', count: 5, interval: 400, delay: 800, yBase: 120, ySpread: 100 },
      { type: 'fighter', pattern: 'straight', count: 4, interval: 300, delay: 2000, yBase: 200, ySpread: 120 },
      // Heavy ground
      { type: 'tank', pattern: 'ground', count: 3, interval: 500, delay: 3000, yBase: 530, ySpread: 0 },
      { type: 'turret', pattern: 'ground', count: 4, interval: 400, delay: 3500, yBase: 520, ySpread: 0 },
      // Bombers + fighters
      { type: 'bomber', pattern: 'zigzag', count: 3, interval: 800, delay: 5000, yBase: 100, ySpread: 80 },
      { type: 'fighter', pattern: 'formation_v', count: 7, interval: 200, delay: 6000, yBase: 100, ySpread: 80 },
      // Intense wave
      { type: 'fighter', pattern: 'dive', count: 5, interval: 350, delay: 7500, yBase: 100, ySpread: 150 },
      { type: 'fighter', pattern: 'sine', count: 4, interval: 400, delay: 8500, yBase: 200, ySpread: 120 },
      { type: 'bomber', pattern: 'straight', count: 3, interval: 600, delay: 9500, yBase: 120, ySpread: 70 },
      // More
      { type: 'fighter', pattern: 'formation_line', count: 8, interval: 180, delay: 11000, yBase: 130, ySpread: 100 },
      { type: 'tank', pattern: 'ground', count: 4, interval: 500, delay: 11500, yBase: 530, ySpread: 0 },
      // Pre-boss swarm
      { type: 'fighter', pattern: 'straight', count: 6, interval: 300, delay: 13000, yBase: 150, ySpread: 150 },
      { type: 'bomber', pattern: 'straight', count: 3, interval: 500, delay: 14000, yBase: 100, ySpread: 80 },
      { type: 'fighter', pattern: 'dive', count: 5, interval: 350, delay: 15000, yBase: 100, ySpread: 100 },
    ],
    bossDelay: 18000,
    bossHP: CONFIG.BOSS.HP_STAGE3,
    bossType: 'superfighter',
    stageDuration: 28000,
  },
];
