// js/combat/status.js — ailment application helpers. Load after js/core/game.js.

function getAilChance(ab, ailId) {
  const tmpl = ABILITY_TEMPLATES[ab.id];
  if (!tmpl || !tmpl.levels) return 0;
  const lvData = tmpl.levels[Math.min(ab.level - 1, tmpl.levels.length - 1)];
  if (lvData.newAilment === ailId) return lvData.ailChance || 0;
  if (lvData.newAilment2 === ailId) return lvData.ailChance2 || 0;
  if (lvData.newAilment3 === ailId) return lvData.ailChance3 || 0;
  for (let i = 0; i < Math.min(ab.level - 1, tmpl.levels.length); i++) {
    const d = tmpl.levels[i];
    if (d.newAilment === ailId || d.newAilment2 === ailId || d.newAilment3 === ailId) {
      const introducedAt = i;
      const lvNow = Math.min(ab.level - 1, tmpl.levels.length - 1);
      const baseC =
        d.newAilment === ailId ? d.ailChance || 0 : d.newAilment2 === ailId ? d.ailChance2 || 0 : d.ailChance3 || 0;
      return baseC + 5 * (lvNow - introducedAt);
    }
  }
  return 0;
}

function tryApplyAilment(target, ailId, ab) {
  const c = getAilChance(ab, ailId);
  if (!c) return false;
  const attackerMatk = target === 'enemy' ? G.player.stats.matk || 8 : G.enemy.stats.matk || 8;
  const targetMdef = target === 'enemy' ? G.enemy.stats.mdef || 8 : G.player.stats.mdef || 8;
  const magicShift = (attackerMatk - targetMdef) * 1.5;
  const adjusted = Math.max(5, Math.min(95, c + magicShift));
  const controlBoost = target === 'enemy' ? Math.floor((getPassiveEvolutionBonuses(G.player).controlPct || 0) * 100) : 0;
  const finalAdj = Math.max(5, Math.min(95, adjusted + controlBoost));
  const rollPct = target === 'enemy' && G.enemy.isBoss ? Math.max(5, Math.floor(finalAdj * 0.5)) : finalAdj;
  if (!chance(rollPct)) return false;
  const stacks = ailId === 'poison' && G.player && G.player.poisonStacksPerHit ? G.player.poisonStacksPerHit : 1;
  applyAilment(target, ailId, stacks);
  return true;
}

function applyAilment(target, ailId, stacks = 1) {
  const status = target === 'player' ? G.playerStatus : G.enemyStatus;
  codexMark('statuses', ailId, 'seen');
  if (target === 'player' && G.player) {
    const _bd = BIRDS[G.player.birdKey];
    const p = _bd && _bd.passive;
    if (ailId === 'poison' && p && p.immunePoison) {
      spawnFloat('player', '🛡 Poison Immune!', 'fn-status');
      return false;
    }
    if (ailId === 'weaken' && p && p.immuneWeaken) {
      spawnFloat('player', '🛡 Weaken Immune!', 'fn-status');
      return false;
    }
    if (ailId === 'feared' && ((p && p.immuneFear) || G.player.stats.immuneFear)) {
      spawnFloat('player', '🛡 Fear Immune!', 'fn-status');
      return false;
    }
    if (ailId === 'confused' && p && p.immuneConfused) {
      spawnFloat('player', '🛡 Confuse Immune!', 'fn-status');
      return false;
    }
    if (ailId === 'paralyzed' && ((p && p.immuneStun) || G.player.immuneParalyze)) {
      spawnFloat('player', '🛡 Stun Immune!', 'fn-status');
      return false;
    }
  }
  if (ailId === 'poison' || ailId === 'bleed') {
    const key = ailId === 'bleed' ? 'bleed' : 'poison';
    if (!status[key]) status[key] = { stacks: 0, turns: 3 };
    const cap = G.player ? G.player.poisonCap || 5 : 5;
    const biomeBonus = target === 'player' && (G.biomeMod?.enemyPoisonPlus || 0) > 0 ? G.biomeMod.enemyPoisonPlus : 0;
    const fromPlayer = target === 'enemy';
    const extraStacks = fromPlayer && key === 'bleed' ? G.player?.bleedBonusStacks || 0 : 0;
    status[key].stacks = Math.min((status[key].stacks || 0) + stacks + extraStacks + biomeBonus, cap);
    const extraTurns = fromPlayer && key === 'poison' ? G.player?.poisonExtraTurns || 0 : 0;
    status[key].turns = 3 + extraTurns;
  } else if (ailId === 'weaken') {
    status.weaken = 3;
  } else if (ailId === 'paralyzed') {
    status.paralyzed = 3;
  } else if (ailId === 'burning') {
    status.burning = 3;
  } else if (ailId === 'chilled') {
    if (target !== 'enemy') return false;
    const baseTurns = 2;
    const extraTurns = G.player?.chillExtraTurns || 0;
    if (!status.chilled) status.chilled = { stacks: 0, turns: 0, spdLost: 0 };
    const cap = 5;
    const addStacks = Math.max(1, Math.floor(Number(stacks) || 1));
    const prev = status.chilled.stacks || 0;
    const next = Math.min(cap, prev + addStacks);
    const delta = next - prev;
    status.chilled.stacks = next;
    status.chilled.turns = Math.max(status.chilled.turns || 0, baseTurns + extraTurns);
    if (delta > 0 && G.enemy?.stats) {
      let cur = Math.max(1, Number(G.enemy.stats.spd) || 1);
      let spdDrop = 0;
      for (let i = 0; i < delta; i++) {
        if (cur <= 1) break;
        cur -= 1;
        spdDrop++;
      }
      if (spdDrop > 0) {
        G.enemy.stats.spd = cur;
        status.chilled.spdLost = (status.chilled.spdLost || 0) + spdDrop;
      }
    }
  } else if (ailId === 'feared') {
    const extra = target === 'enemy' && G.player?.mutDarkChorus ? 1 : 0;
    status.feared = (status.feared || 0) + stacks + extra;
  } else if (ailId === 'delayed') {
    // set by caller with specific dmg
  }
  return true;
}

globalThis.getAilChance = getAilChance;
globalThis.tryApplyAilment = tryApplyAilment;
globalThis.applyAilment = applyAilment;
