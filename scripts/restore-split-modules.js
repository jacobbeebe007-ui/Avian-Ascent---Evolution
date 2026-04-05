/**
 * Restores js/data/* and js/combat/* from git blob 76ac60f:js/core/game.js.
 * Run: node scripts/restore-split-modules.js (requires Node on PATH)
 * Or use the PowerShell slice recipe in repo history / plan doc.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = execSync('git show 76ac60f:js/core/game.js', {
  cwd: ROOT,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
const lines = SRC.split(/\r?\n/);

function slice(a, b) {
  return lines.slice(a - 1, b).join('\n');
}

function write(rel, body) {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body.replace(/\n+$/, '') + '\n', 'utf8');
  console.log('wrote', rel);
}

write(
  'js/data/birds.js',
  `// Playable bird definitions (legacy 76ac60f)\n${slice(644, 1091)}\n\nglobalThis.BIRDS = BIRDS;`,
);

write(
  'js/data/enemies.js',
  `// Story ENEMIES + BIRD_ENEMIES; boss pool + ENEMY_ABILITY_POOL stay in game.js\n${slice(1096, 1140)}\n${slice(1269, 1337)}\n\nglobalThis.ENEMIES = ENEMIES;\nglobalThis.BIRD_ENEMIES = BIRD_ENEMIES;`,
);

write(
  'js/data/skill-families.js',
  `// Skill family / evolution tables (legacy 76ac60f)\n${slice(2871, 4767)}\n\ntry {\n  globalThis.SKILL_EVOLUTION_LEVEL_INTERVAL = SKILL_EVOLUTION_LEVEL_INTERVAL;\n  globalThis.FAMILY_EVOLUTION_BIRD_DATA = FAMILY_EVOLUTION_BIRD_DATA;\n} catch (_) {}`,
);

write(
  'js/data/rewards-upgrades.js',
  `// Reward / upgrade pools (legacy 76ac60f)\n${slice(1343, 1488)}\n\ntry {\n  globalThis.REWARD_WEIGHTS = REWARD_WEIGHTS;\n  globalThis.UPGRADE_CARDS_REWORK = UPGRADE_CARDS_REWORK;\n  globalThis.getUpgradePool = getUpgradePool;\n  globalThis.rollRarity = rollRarity;\n} catch (_) {}`,
);

write(
  'js/combat/damage-math.js',
  `// Core combat math (legacy 76ac60f)\n${slice(9881, 9892)}\n\nfunction roll(min, max) {\n  const a = Math.min(min, max);\n  const b = Math.max(min, max);\n  return Math.floor(Math.random() * (b - a + 1)) + a;\n}\n\nglobalThis.roll = roll;\nglobalThis.softCapChance = softCapChance;\nglobalThis.clamp01 = clamp01;\nglobalThis.getAccChance = getAccChance;\nglobalThis.getDodgeChance = getDodgeChance;\nglobalThis.getMdodgeChance = getMdodgeChance;\nglobalThis.calcHitChance = calcHitChance;\nglobalThis.calcDefenseMultiplier = calcDefenseMultiplier;\n`,
);

write(
  'js/combat/enemy-damage.js',
  `// Enemy damage helpers (legacy 76ac60f)\n${slice(10699, 10740)}\n\nglobalThis.calcEnemyAbilityDamage = calcEnemyAbilityDamage;\nglobalThis.applyBossBurstBuffer = applyBossBurstBuffer;\nglobalThis.edmg = edmg;\nglobalThis.rollEnemyCritDamage = rollEnemyCritDamage;\n`,
);

write('js/combat/status.js', '// Status: main implementation in js/core/game.js\n');
write('js/combat/turn-loop.js', '// Turn loop: main implementation in js/core/game.js\n');
write('js/combat/ai-enemy.js', '// Enemy AI: main implementation in js/core/game.js\n');

console.log('Done.');
