// js/combat/turn-loop.js — DoT ticks + generic status decay. Load after js/combat/status.js.

async function tickDoTs(who) {
  const status = who === 'player' ? G.playerStatus : G.enemyStatus;
  const stats = who === 'player' ? G.player.stats : G.enemy.stats;
  if (status.poison && status.poison.stacks > 0 && status.poison.turns > 0) {
    const ownerBonus = who === 'enemy';
    const tickMult = ownerBonus ? G.player?.poisonTickMult || 1 : 1;
    const flatBonus = ownerBonus
      ? (G.player?.poisonFlatBonus || 0) + (G.player?.perkPoisonTickBonus || 0) + (G.player?.relVenomLedger ? 1 : 0)
      : 0;
    const dmg = Math.max(1, Math.floor(status.poison.stacks * tickMult) + flatBonus);
    stats.hp -= dmg;
    spawnFloat(who, `☣ -${dmg}`, 'fn-poison');
    setHpBar(who, stats.hp, stats.maxHp);
    logMsg(`☣ Avian Poison deals ${dmg} poison damage to ${who === 'player' ? G.player.name : G.enemy.name}!`, 'poison-tick');
    if (who === 'enemy') {
      BS.dmgDealt += dmg;
    }
    SFX.poison();
    status.poison.turns--;
    if (status.poison.turns <= 0) {
      delete status.poison;
    }
    await delay(500);
  }
  if (status.bleed && status.bleed.stacks > 0 && status.bleed.turns > 0) {
    let dmg = Math.max(1, Math.floor(status.bleed.stacks * 1.5));
    if (who === 'player' && G.player?.mutBloodMoon) dmg *= 2;
    stats.hp -= dmg;
    spawnFloat(who, `🩸 -${dmg}`, 'fn-dmg');
    setHpBar(who, stats.hp, stats.maxHp);
    logMsg(`🩸 Bleed deals ${dmg} damage to ${who === 'player' ? G.player.name : G.enemy.name}!`, 'poison-tick');
    if (who === 'enemy') {
      BS.dmgDealt += dmg;
    }
    status.bleed.turns--;
    if (status.bleed.turns <= 0) {
      delete status.bleed;
    }
    await delay(500);
  }
  if (
    status.burning &&
    ((typeof status.burning === 'number' && status.burning > 0) ||
      (typeof status.burning === 'object' && status.burning.turns > 0))
  ) {
    const turns = typeof status.burning === 'number' ? status.burning : status.burning.turns;
    const dmg = Math.max(1, Math.floor((stats.maxHp || 1) * 0.04));
    stats.hp -= dmg;
    spawnFloat(who, `🔥 -${dmg}`, 'fn-burn');
    setHpBar(who, stats.hp, stats.maxHp);
    logMsg(`🔥 Burn deals ${dmg} damage to ${who === 'player' ? G.player.name : G.enemy.name}!`, 'burn-tick');
    if (who === 'enemy') {
      BS.dmgDealt += dmg;
    }
    if (typeof status.burning === 'number') status.burning = turns - 1;
    else status.burning.turns = turns - 1;
    if (
      (typeof status.burning === 'number' && status.burning <= 0) ||
      (typeof status.burning === 'object' && status.burning.turns <= 0)
    )
      delete status.burning;
    await delay(500);
  }
  if (status.delayed && status.delayed.dmg > 0) {
    let dmg = status.delayed.dmg;
    if (who === 'enemy' && G.player?.birdKey === 'flamingo' && BIRDS.flamingo?.passive?.id === 'marshPoise') {
      dmg = Math.max(1, Math.floor(dmg * 1.12));
    }
    stats.hp -= dmg;
    spawnFloat(who, `🎵 -${dmg}`, 'fn-status');
    setHpBar(who, stats.hp, stats.maxHp);
    logMsg(`🎵 Resonance detonates! ${dmg} damage!`, 'system');
    delete status.delayed;
    await delay(500);
  }
}

function tickStatuses(who) {
  const s = who === 'player' ? G.playerStatus : G.enemyStatus;
  const keys = Object.keys(s);
  const owner = who === 'player' ? G.player : G.enemy;
  keys.forEach((k) => {
    if (k === 'poison' || k === 'bleed') {
      /* handled by tickDoTs */
    } else if (k === 'delayed') {
      /* handled by tickDoTs */
    } else if (k === 'defBoost' && typeof s[k] === 'object') {
      s[k].turns--;
      if (s[k].turns <= 0) {
        owner.stats.def = Math.max(0, (owner.stats.def || 0) - (s[k].amt || 0));
        delete s[k];
      }
    } else if (k === 'counterThorns') {
      /* temporary per defending window */
    } else if (typeof s[k] === 'number' && s[k] > 0) s[k]--;
    else if (typeof s[k] === 'object' && s[k].turns !== undefined) {
      /* skip */
    }
  });
  if (who === 'player' && !s.defending && s.counterThorns) delete s.counterThorns;
}

globalThis.tickDoTs = tickDoTs;
globalThis.tickStatuses = tickStatuses;
