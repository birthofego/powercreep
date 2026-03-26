// ============================================================
// POWERCREEP — ARCANE PRISMATIC THEME
// "Yesterday's you is obsolete."
// ============================================================

// --- CORE PALETTE ---
export const colors = {
  // Backgrounds
  bg:          '#080b14',
  surface:     '#0e1221',
  surface2:    '#141a2e',
  surface3:    '#1a2138',

  // Borders
  border:       'rgba(129,140,248,0.10)',
  borderAccent: 'rgba(129,140,248,0.25)',
  borderBright: 'rgba(129,140,248,0.40)',

  // Primary accent
  primary:     '#818cf8',
  primaryDim:  '#6366f1',
  primaryGlow: 'rgba(129,140,248,0.12)',

  // Text hierarchy
  text:        '#e2e0f0',
  textMid:     '#8888b0',
  textDim:     '#555578',
  textDead:    '#2a2a40',

  // Semantic
  hp:          '#ef4444',
  xp:          '#818cf8',
  gold:        '#fbbf24',
  success:     '#22c55e',
  warning:     '#f59e0b',

  // Sin jewel colors
  sinLust:      '#e24b80',
  sinGluttony:  '#f59e0b',
  sinGreed:     '#22d3a7',
  sinSloth:     '#6366f1',
  sinWrath:     '#ef4444',
  sinPride:     '#a855f7',
  sinEnvy:      '#06b6d4',

  // Class colors
  classWarrior:  '#ef4444',
  classMage:     '#818cf8',
  classRogue:    '#22d3a7',
  classPaladin:  '#fbbf24',
  classMonk:     '#a855f7',
  classCleric:   '#f472b6',
};

// --- TYPOGRAPHY ---
export const fonts = {
  display: "'Cinzel Decorative', 'Cinzel', serif",
  heading: "'Rajdhani', 'Barlow Condensed', sans-serif",
  body:    "'Rajdhani', 'Barlow Condensed', sans-serif",
  mono:    "'JetBrains Mono', 'Share Tech Mono', monospace",
  sans:    "'Rajdhani', 'Barlow Condensed', sans-serif",
};

export const spacing = {
  screenPadding: '0 18px',
};

// --- SEVEN DEADLY SINS ---
export const SINS = [
  {
    id: 'lust',
    name: 'LUST',
    sin: 'Lust',
    modern: 'NSFW media / pornography addiction',
    desc: 'Track your streak of abstaining from explicit content.',
    color: colors.sinLust,
    jewel: 'Ruby',
    virtue: 'Resolve',
    checkIn: 'Did you resist temptation?',
  },
  {
    id: 'gluttony',
    name: 'GLUTTONY',
    sin: 'Gluttony',
    modern: 'Sugar / carbs / junk food addiction',
    desc: 'Track your dietary discipline — cutting sugar, carbs, or binge eating.',
    color: colors.sinGluttony,
    jewel: 'Topaz',
    virtue: 'Vitality',
    checkIn: 'Did you stay clean on your diet?',
  },
  {
    id: 'greed',
    name: 'GREED',
    sin: 'Greed',
    modern: 'Gambling / overspending / impulse buying',
    desc: 'Track your financial discipline — no gambling, no impulse purchases.',
    color: colors.sinGreed,
    jewel: 'Emerald',
    virtue: 'Wisdom',
    checkIn: 'Did you hold the line financially?',
  },
  {
    id: 'sloth',
    name: 'SLOTH',
    sin: 'Sloth',
    modern: 'Procrastination / avoiding your goals',
    desc: 'Track whether you showed up and worked toward your declared goals.',
    color: colors.sinSloth,
    jewel: 'Sapphire',
    virtue: 'Discipline',
    checkIn: 'Did you take action toward your goals?',
  },
  {
    id: 'wrath',
    name: 'WRATH',
    sin: 'Wrath',
    modern: 'Anger management / emotional volatility',
    desc: 'Track your temper. Journal your triggers, build your calm.',
    color: colors.sinWrath,
    jewel: 'Garnet',
    virtue: 'Serenity',
    checkIn: 'Did you stay calm today?',
  },
  {
    id: 'pride',
    name: 'PRIDE',
    sin: 'Pride',
    modern: 'Social media vanity / validation addiction',
    desc: 'Track your ability to stop seeking external validation.',
    color: colors.sinPride,
    jewel: 'Amethyst',
    virtue: 'Humility',
    checkIn: 'Did you stay grounded today?',
  },
  {
    id: 'envy',
    name: 'ENVY',
    sin: 'Envy',
    modern: 'Toxic comparison / doomscrolling others\' lives',
    desc: 'Track your ability to stop comparing yourself to others.',
    color: colors.sinEnvy,
    jewel: 'Aquamarine',
    virtue: 'Gratitude',
    checkIn: 'Did you stay in your lane today?',
  },
];

// --- SIX CLASSES ---
export const CLASSES = [
  {
    id: 'warrior',
    name: 'WARRIOR',
    archetype: 'The Unbreakable',
    desc: 'Brute willpower. Warriors gain a streak shield — once per week, a failed check-in doesn\'t reset your streak.',
    perk: 'Streak shield (1x/week)',
    color: colors.classWarrior,
    hp: 12, atk: 6,
    statAffinity: ['Resolve', 'Discipline'],
  },
  {
    id: 'mage',
    name: 'MAGE',
    archetype: 'The Mindful',
    desc: 'Knowledge is power. Mages earn bonus XP for journaling triggers and reflections after each check-in.',
    perk: '2x XP from journal entries',
    color: colors.classMage,
    hp: 10, atk: 4,
    statAffinity: ['Wisdom', 'Humility'],
  },
  {
    id: 'rogue',
    name: 'ROGUE',
    archetype: 'The Opportunist',
    desc: 'Precision over persistence. Rogues earn doubled rewards during self-flagged "danger windows."',
    perk: '2x rewards in danger windows',
    color: colors.classRogue,
    hp: 9, atk: 7,
    statAffinity: ['Gratitude', 'Vitality'],
  },
  {
    id: 'paladin',
    name: 'PALADIN',
    archetype: 'The Protector',
    desc: 'Accountability through others. Link with a partner for shared streak bonuses and rally quests.',
    perk: 'Partner streak bonuses',
    color: colors.classPaladin,
    hp: 11, atk: 5,
    statAffinity: ['Serenity', 'Resolve'],
  },
  {
    id: 'monk',
    name: 'MONK',
    archetype: 'The Ascetic',
    desc: 'No streak shields, no safety nets — but 1.5x base XP gain. Hard mode with bigger rewards.',
    perk: '1.5x base XP (no safety nets)',
    color: colors.classMonk,
    hp: 8, atk: 5,
    statAffinity: ['Discipline', 'Serenity'],
  },
  {
    id: 'cleric',
    name: 'CLERIC',
    archetype: 'The Healer',
    desc: 'Recovery specialist. Clerics bounce back faster — halved penance cooldown and 2x stat recovery after resets.',
    perk: 'Half recovery time after reset',
    color: colors.classCleric,
    hp: 10, atk: 4,
    statAffinity: ['Vitality', 'Gratitude'],
  },
];

// --- HELPERS ---
export function getSinById(id) {
  return SINS.find(s => s.id === id) || SINS[0];
}

export function getClassById(id) {
  return CLASSES.find(c => c.id === id) || CLASSES[0];
}

export function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// --- SHARED STYLES ---
export const inputStyle = {
  background: colors.surface2,
  border: `1px solid ${colors.border}`,
  color: colors.text,
  padding: '12px 14px',
  fontFamily: fonts.body,
  fontSize: '14px',
  fontWeight: 500,
  width: '100%',
  outline: 'none',
  letterSpacing: '0.5px',
  borderRadius: '6px',
  transition: 'border-color 0.2s',
};

export const buttonPrimary = {
  background: colors.primary,
  color: '#080b14',
  border: 'none',
  padding: '14px',
  fontFamily: fonts.heading,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '2px',
  cursor: 'pointer',
  width: '100%',
  borderRadius: '6px',
  transition: 'all 0.2s',
  textTransform: 'uppercase',
};

export const buttonGhost = {
  background: 'transparent',
  color: colors.textDim,
  border: `1px solid ${colors.border}`,
  padding: '14px',
  fontFamily: fonts.heading,
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: '2px',
  cursor: 'pointer',
  width: '100%',
  borderRadius: '6px',
  transition: 'all 0.2s',
  textTransform: 'uppercase',
};