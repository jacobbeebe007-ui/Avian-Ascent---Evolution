// js/combat/damage-math.js — pure RNG + hit / defense scaling (no G). Load before js/core/game.js.

// ============================================================
//  COMBAT MATH
// ============================================================
function roll(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

const SOFTCAP_K = { acc: 120, dodge: 120, mdodge: 140 };
const HIT_CLAMP = { min: 0.15, max: 0.95 };
function softCapChance(stat, k) {
  return stat <= 0 ? 0 : stat / (stat + k);
}
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function getAccChance(acc) {
  return softCapChance(Math.max(0, acc || 0), SOFTCAP_K.acc);
}
function getDodgeChance(dodge) {
  return softCapChance(Math.max(0, dodge || 0), SOFTCAP_K.dodge);
}
function getMdodgeChance(mdodge) {
  return softCapChance(Math.max(0, mdodge || 0), SOFTCAP_K.mdodge);
}
function calcHitChance(attAcc, defDodge, baseHit = 0.72) {
  const raw = baseHit + (getAccChance(attAcc) - getDodgeChance(defDodge));
  return Math.max(HIT_CLAMP.min, Math.min(HIT_CLAMP.max, raw));
}
function calcDefenseMultiplier(def) {
  return 100 / (100 + Math.max(0, def || 0));
}

globalThis.roll = roll;
globalThis.calcHitChance = calcHitChance;
globalThis.calcDefenseMultiplier = calcDefenseMultiplier;
