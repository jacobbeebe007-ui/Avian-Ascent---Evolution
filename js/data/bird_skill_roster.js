// js/data/bird_skill_roster.js — canonical default kit (slot 1–4 skill ids) for skills rework.
// Load before js/data/birds.js. BIRDS.mainAttackId should match slot 1; BIRDS.startAbilities should match slots 1–4.

const BIRD_SKILL_ROSTER = Object.freeze({
  sparrow: Object.freeze({ mainAttackId: 'multiPeck', startAbilities: Object.freeze(['multiPeck', 'dart', 'windFeint', 'trackPrey']) }),
  hummingbird: Object.freeze({ mainAttackId: 'needle_jab', startAbilities: Object.freeze(['needle_jab', 'dash', 'blink_flutter', 'combo_strike']) }),
  blackbird: Object.freeze({ mainAttackId: 'dark_song', startAbilities: Object.freeze(['dark_song', 'shadow_peck', 'gloom_wing', 'grim_sign']) }),
  macaw: Object.freeze({ mainAttackId: 'echo_note', startAbilities: Object.freeze(['echo_note', 'mimic_song', 'feather_taunt', 'chorus_mark']) }),
  peregrine: Object.freeze({ mainAttackId: 'talon_jab', startAbilities: Object.freeze(['talon_jab', 'dive', 'keen_eye', 'aerial_pace']) }),
  snowyOwl: Object.freeze({ mainAttackId: 'talon_snap', startAbilities: Object.freeze(['talon_snap', 'silent_dive', 'owl_eye', 'frost_glide']) }),
  kiwi: Object.freeze({ mainAttackId: 'beak_jab', startAbilities: Object.freeze(['beak_jab', 'night_probe', 'scent_hunt', 'scrape']) }),
  blackCockatoo: Object.freeze({ mainAttackId: 'beak_crack', startAbilities: Object.freeze(['beak_crack', 'boom_call', 'wing_beat', 'resonance_mark']) }),
  crow: Object.freeze({ mainAttackId: 'peck', startAbilities: Object.freeze(['peck', 'murder_murmuration', 'dread_call', 'battle_focus']) }),
  kookaburra: Object.freeze({ mainAttackId: 'beak_chop', startAbilities: Object.freeze(['beak_chop', 'laugh_call', 'perch_watch', 'drop_strike']) }),
  lyrebird: Object.freeze({ mainAttackId: 'echo_note', startAbilities: Object.freeze(['echo_note', 'mimic_chorus', 'display_step', 'refrain_mark']) }),
  raven: Object.freeze({ mainAttackId: 'beak_jab', startAbilities: Object.freeze(['beak_jab', 'omen_call', 'dark_watch', 'fate_mark']) }),
  magpie: Object.freeze({ mainAttackId: 'swoop', startAbilities: Object.freeze(['swoop', 'steal_shine', 'feather_flick', 'dart']) }),
  robin: Object.freeze({ mainAttackId: 'quick_peck', startAbilities: Object.freeze(['quick_peck', 'dart_rush', 'bright_chirp', 'hop_step']) }),
  bowerbird: Object.freeze({ mainAttackId: 'trinket_toss', startAbilities: Object.freeze(['trinket_toss', 'lure_call', 'bower_build', 'display_mark']) }),
  toucan: Object.freeze({ mainAttackId: 'toucan_beak_jab', startAbilities: Object.freeze(['toucan_beak_jab', 'beak_slam', 'fruit_toss', 'color_mark']) }),
  swan: Object.freeze({ mainAttackId: 'neck_jab', startAbilities: Object.freeze(['neck_jab', 'wing_sweep', 'grace_glide', 'poise_mark']) }),
  flamingo: Object.freeze({ mainAttackId: 'leg_jab', startAbilities: Object.freeze(['leg_jab', 'marsh_sweep', 'balance_pose', 'mire_mark']) }),
  secretary: Object.freeze({ mainAttackId: 'sec_leg_jab', startAbilities: Object.freeze(['sec_leg_jab', 'sec_crushing_kick', 'hunter_stride', 'prey_mark']) }),
  albatross: Object.freeze({ mainAttackId: 'alb_wing_jab', startAbilities: Object.freeze(['alb_wing_jab', 'alb_ocean_sweep', 'alb_glide_line', 'alb_current_mark']) }),
  seagull: Object.freeze({ mainAttackId: 'sgl_snap_peck', startAbilities: Object.freeze(['sgl_snap_peck', 'sgl_swoop_pass', 'sgl_raucous_cry', 'sgl_scavenge_mark']) }),
  goose: Object.freeze({ mainAttackId: 'gos_beak_snap', startAbilities: Object.freeze(['gos_beak_snap', 'gos_body_check', 'gos_honk_blast', 'gos_brace_up']) }),
  shoebill: Object.freeze({ mainAttackId: 'sbl_beak_chop', startAbilities: Object.freeze(['sbl_beak_chop', 'sbl_skull_crack', 'sbl_still_stance', 'sbl_dread_mark']) }),
  harpy: Object.freeze({ mainAttackId: 'hrp_talon_clutch', startAbilities: Object.freeze(['hrp_talon_clutch', 'hrp_canopy_crush', 'hrp_predator_grip', 'hrp_prey_lock']) }),
  baldEagle: Object.freeze({ mainAttackId: 'skyTalon', startAbilities: Object.freeze(['skyTalon', 'guard', 'predatorMark', 'freedomCry']) }),
  penguin: Object.freeze({ mainAttackId: 'icebreakerHonk', startAbilities: Object.freeze(['icebreakerHonk', 'snowWall', 'guard', 'tundraCall']) }),
  ostrich: Object.freeze({ mainAttackId: 'powerKick', startAbilities: Object.freeze(['powerKick', 'stampedeStrike', 'sandKick', 'momentumCharge']) }),
  cassowary: Object.freeze({ mainAttackId: 'raptorKick', startAbilities: Object.freeze(['raptorKick', 'warStomp', 'momentumCharge', 'crushingTalon']) }),
  emu: Object.freeze({ mainAttackId: 'headWhip', startAbilities: Object.freeze(['headWhip', 'warCharge', 'sandKick', 'momentumStrike']) }),
  dukeBlakiston: Object.freeze({ mainAttackId: 'nightTalon', startAbilities: Object.freeze(['nightTalon', 'nightfallCall', 'courtSummon', 'verdict']) }),
});

globalThis.BIRD_SKILL_ROSTER = BIRD_SKILL_ROSTER;
