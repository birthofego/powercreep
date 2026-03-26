// ============================================================
// POWERCREEP — SVG ICON SYSTEM
// Sin crests, class emblems, and UI icons as React components.
// Usage: <SinWrath size={32} color={colors.sinWrath} />
// ============================================================

import React from 'react';

// ============================================================
// SIN CRESTS — Seven Deadly Sins
// ============================================================

export function SinLust({ size = 32, color = '#e24b80' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6c-2 0-4.2 1.6-5.2 4.2-1.8-1.2-4-.8-5 .8s-.4 3.8 1.2 4.8c-1.6 1.2-2.2 3.4-.6 5s3.4 1.8 5 .8c1 2.6 3.2 4.4 5.4 4.4" stroke={color} strokeWidth="1" fill={color + '10'} strokeLinejoin="round"/>
      <path d="M16 6c2 0 4.2 1.6 5.2 4.2 1.8-1.2 4-.8 5 .8s.4 3.8-1.2 4.8c1.6 1.2 2.2 3.4.6 5s-3.4 1.8-5 .8c-1 2.6-3.2 4.4-5.4 4.4" stroke={color} strokeWidth="1" fill={color + '10'} strokeLinejoin="round"/>
      <circle cx="16" cy="15" r="4" stroke={color} strokeWidth="0.8" fill={color + '18'}/>
      <circle cx="16" cy="15" r="2" fill={color} opacity="0.25"/>
      <path d="M16 22v5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14.5 24l-1-1.5M17.5 25l1-1.5" stroke={color} strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M16 11V8M12 13l-2-1.5M20 13l2-1.5" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function SinGluttony({ size = 32, color = '#f59e0b' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14h8l-1 10h-6z" stroke={color} strokeWidth="1" fill={color + '10'} strokeLinejoin="round"/>
      <path d="M13.5 24h5v2h-5z" stroke={color} strokeWidth="0.8" fill={color + '0D'}/>
      <path d="M11 26h10" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <ellipse cx="16" cy="14" rx="5" ry="2" stroke={color} strokeWidth="1" fill={color + '15'}/>
      <path d="M11.5 13c-.5-1 0-2.5 1.5-3 .5 1 1.5 2 3 2s2.5-1 3-2c1.5.5 2 2 1.5 3" stroke={color} strokeWidth="0.8" fill={color + '10'}/>
      <path d="M14 9c0-1 .5-2 1-2.5.5.5 1 1.5 1 2.5M17 8c0-1.2.4-2 .8-2.5.4.5.8 1.3.8 2.5" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
      <circle cx="16" cy="19" r="1" fill={color} opacity="0.3"/>
    </svg>
  );
}

export function SinGreed({ size = 32, color = '#22d3a7' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1" fill={color + '08'}/>
      <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="0.8" fill={color + '10'}/>
      <circle cx="16" cy="16" r="2.5" stroke={color} strokeWidth="0.8" fill={color + '18'}/>
      <path d="M16 7v-1M16 26v-1M7 16H6M26 16h-1" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M10.3 10.3l-.7-.7M22.4 10.3l.7-.7M10.3 21.7l-.7.7M22.4 21.7l.7.7" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      <path d="M14.5 14.5c0-.8.7-1.2 1.5-1.2s1.5.4 1.5 1.2-.7 1.2-1.5 1.8-1.5.6-1.5 1.3.7 1.2 1.5 1.2 1.5-.4 1.5-1.2" stroke={color} strokeWidth="0.7" strokeLinecap="round"/>
    </svg>
  );
}

export function SinSloth({ size = 32, color = '#6366f1' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 18h16" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 18v-4c0-1.5 1.2-2.5 2.8-2.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <path d="M22 18v-4c0-1.5-1.2-2.5-2.8-2.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <path d="M13.2 11.5c.8-.6 1.8-.8 2.8-.8s2 .2 2.8.8" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M10 14l2-3 2 2 2-2.5 2 2.5 2-2 2 3" stroke={color} strokeWidth="0.8" strokeLinejoin="round" fill={color + '0A'}/>
      <ellipse cx="16" cy="22.5" rx="7" ry="3" stroke={color} strokeWidth="1" fill={color + '0D'}/>
      <text x="22" y="10" fill={color} fontSize="5" fontWeight="600" fontFamily="monospace" opacity="0.6">z</text>
      <text x="25" y="8" fill={color} fontSize="4" fontWeight="600" fontFamily="monospace" opacity="0.4">z</text>
    </svg>
  );
}

export function SinWrath({ size = 32, color = '#ef4444' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4l-3.5 7.5H5l5.5 4.5-2 7.5L16 19l7.5 4.5-2-7.5L27 11.5h-7.5z" stroke={color} strokeWidth="1" fill={color + '0C'} strokeLinejoin="round"/>
      <path d="M16 10v6M13 14h6" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <path d="M13.5 11.5l5 5M18.5 11.5l-5 5" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M16 4v-1M8 8l-.7-.7M24 8l.7-.7" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M12 26c1.5-.8 3-1 4-1s2.5.2 4 1" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

export function SinPride({ size = 32, color = '#a855f7' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="14" r="7" stroke={color} strokeWidth="1" fill={color + '08'}/>
      <circle cx="16" cy="14" r="5" stroke={color} strokeWidth="0.8" fill={color + '10'}/>
      <path d="M13 11c.5-.8 1.5-1.5 3-1.5" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      <path d="M16 21v4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M13 25h6" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 27h8" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M12 8l1.5-2 2.5 1.5L18.5 6 20 8" stroke={color} strokeWidth="0.7" strokeLinejoin="round" fill={color + '0A'}/>
      <ellipse cx="16" cy="14" rx="2.5" ry="1.5" stroke={color} strokeWidth="0.7" fill={color + '15'}/>
      <circle cx="16" cy="14" r="0.8" fill={color} opacity="0.4"/>
    </svg>
  );
}

export function SinEnvy({ size = 32, color = '#06b6d4' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 5l-9 11 9 12 9-12z" stroke={color} strokeWidth="1" fill={color + '08'} strokeLinejoin="round"/>
      <path d="M16 9l-5 7 5 8 5-8z" stroke={color} strokeWidth="0.8" fill={color + '10'} strokeLinejoin="round"/>
      <path d="M11 14l5 2 5-2" stroke={color} strokeWidth="0.6" opacity="0.5"/>
      <path d="M12.5 19l3.5-1 3.5 1" stroke={color} strokeWidth="0.5" opacity="0.35"/>
      <circle cx="16" cy="15" r="1.5" fill={color} opacity="0.3"/>
      <path d="M16 5v-1.5M7 16H5.5M25 16h1.5" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

// ============================================================
// CLASS EMBLEMS
// ============================================================

export function ClassWarrior({ size = 32, color = '#ef4444' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4L8 10v8l8 10 8-10v-8z" stroke={color} strokeWidth="1" fill={color + '08'} strokeLinejoin="round"/>
      <path d="M12 10l8 12" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M11 11l2-.5-.5 2" stroke={color} strokeWidth="0.7" strokeLinejoin="round"/>
      <path d="M20 10l-8 12" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M21 11l-2-.5.5 2" stroke={color} strokeWidth="0.7" strokeLinejoin="round"/>
      <circle cx="16" cy="16" r="1.5" fill={color} opacity="0.35"/>
    </svg>
  );
}

export function ClassMage({ size = 32, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6v20" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="16" cy="8" r="3.5" stroke={color} strokeWidth="1" fill={color + '10'}/>
      <circle cx="16" cy="8" r="1.5" fill={color} opacity="0.3"/>
      <path d="M12.5 15l-4 2.5 4 1" stroke={color} strokeWidth="0.8" strokeLinejoin="round" fill={color + '08'}/>
      <path d="M19.5 15l4 2.5-4 1" stroke={color} strokeWidth="0.8" strokeLinejoin="round" fill={color + '08'}/>
      <path d="M13 26h6" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <circle cx="13" cy="6" r="0.5" fill={color} opacity="0.4"/>
      <circle cx="19.5" cy="9" r="0.5" fill={color} opacity="0.3"/>
      <circle cx="14" cy="11" r="0.4" fill={color} opacity="0.35"/>
    </svg>
  );
}

export function ClassRogue({ size = 32, color = '#22d3a7' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6l-1 14 1 2 1-2z" stroke={color} strokeWidth="0.8" fill={color + '10'} strokeLinejoin="round"/>
      <path d="M9.5 18.5h5" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M20 6l-1 14 1 2 1-2z" stroke={color} strokeWidth="0.8" fill={color + '10'} strokeLinejoin="round"/>
      <path d="M17.5 18.5h5" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M8 24c2-2 5-3.5 8-3.5s6 1.5 8 3.5" stroke={color} strokeWidth="0.8" strokeLinecap="round" fill={color + '06'}/>
      <ellipse cx="16" cy="14" rx="3" ry="1.5" stroke={color} strokeWidth="0.7" fill={color + '0D'}/>
      <circle cx="16" cy="14" r="0.8" fill={color} opacity="0.4"/>
    </svg>
  );
}

export function ClassPaladin({ size = 32, color = '#fbbf24' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4L8 8v9c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V8z" stroke={color} strokeWidth="1" fill={color + '08'} strokeLinejoin="round"/>
      <path d="M16 8l-5 2.5v5.5c0 3.5 2.2 5.5 5 7 2.8-1.5 5-3.5 5-7v-5.5z" stroke={color} strokeWidth="0.7" fill={color + '0A'} strokeLinejoin="round"/>
      <path d="M16 11v8M13 15.5h6" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M13 5l1.5-1.5L16 4.5l1.5-1L19 5" stroke={color} strokeWidth="0.6" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  );
}

export function ClassMonk({ size = 32, color = '#a855f7' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="0.6" fill="none" opacity="0.2"/>
      <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="0.8" fill={color + '06'}/>
      <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1" fill={color + '0A'}/>
      <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1" fill={color + '12'}/>
      <circle cx="16" cy="16" r="1" fill={color} opacity="0.4"/>
      <path d="M16 4v2M16 26v2M4 16h2M26 16h2" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M8.5 8.5l1.2 1.2M22.3 8.5l-1.2 1.2M8.5 23.5l1.2-1.2M22.3 23.5l-1.2-1.2" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>
    </svg>
  );
}

export function ClassCleric({ size = 32, color = '#f472b6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8c-3 0-6 3-6.5 7.5 1.5-1 3.5-1.5 6.5-1.5" stroke={color} strokeWidth="0.8" fill={color + '0A'}/>
      <path d="M16 8c3 0 6 3 6.5 7.5-1.5-1-3.5-1.5-6.5-1.5" stroke={color} strokeWidth="0.8" fill={color + '0A'}/>
      <path d="M9 18c-.5-3 .5-6 2.5-8" stroke={color} strokeWidth="0.7" opacity="0.4"/>
      <path d="M23 18c.5-3-.5-6-2.5-8" stroke={color} strokeWidth="0.7" opacity="0.4"/>
      <ellipse cx="16" cy="17" rx="4" ry="3" stroke={color} strokeWidth="0.8" fill={color + '12'}/>
      <path d="M16 15v4M14.5 17h3" stroke={color} strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M16 20v6" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <path d="M14 23c.5.5 1.2.8 2 .8s1.5-.3 2-.8" stroke={color} strokeWidth="0.6" opacity="0.3"/>
    </svg>
  );
}

// ============================================================
// UI ICONS
// ============================================================

export function IconHome({ size = 20, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12l8-8 8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 11v8a1 1 0 001 1h3.5v-5h3v5H17a1 1 0 001-1v-8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconBoss({ size = 20, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="10" r="5" stroke={color} strokeWidth="1.5"/>
      <path d="M12 5l-1.5-2.5L12 3.5l1.5-1L12 5z" stroke={color} strokeWidth="0.8" fill={color + '20'}/>
      <path d="M9 14.5c-3 1-5 3-5 5.5h16c0-2.5-2-4.5-5-5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7.5 8l-2-3M16.5 8l2-3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconWeapons({ size = 20, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 17l3 4 3-4" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 8h8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 5l2-2 2 2" stroke={color} strokeWidth="1" strokeLinejoin="round" fill={color + '15'}/>
    </svg>
  );
}

export function IconJournal({ size = 20, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M9 7h6M9 11h6M9 15h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5 7h2M5 11h2M5 15h2" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function IconProfile({ size = 20, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M5 20c0-3.5 3.1-6.5 7-6.5s7 3 7 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconStreak({ size = 20, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3c0 0-6 5-6 11a6 6 0 0012 0c0-6-6-11-6-11z" stroke={color} strokeWidth="1.5" fill={color + '10'} strokeLinejoin="round"/>
      <path d="M12 10c0 0-3 2.5-3 5.5a3 3 0 006 0c0-3-3-5.5-3-5.5z" fill={color} opacity="0.25"/>
    </svg>
  );
}

export function IconCheck({ size = 16, color = '#22c55e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8.5l3 3 5-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconPlus({ size = 16, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3v10M3 8h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconBack({ size = 16, color = '#555578' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3L5 8l5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconX({ size = 16, color = '#555578' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ============================================================
// LOOKUP MAPS
// ============================================================

export const SIN_ICONS = {
  lust: SinLust,
  gluttony: SinGluttony,
  greed: SinGreed,
  sloth: SinSloth,
  wrath: SinWrath,
  pride: SinPride,
  envy: SinEnvy,
};

export const CLASS_ICONS = {
  warrior: ClassWarrior,
  mage: ClassMage,
  rogue: ClassRogue,
  paladin: ClassPaladin,
  monk: ClassMonk,
  cleric: ClassCleric,
};

export const NAV_ICONS = {
  home: IconHome,
  boss: IconBoss,
  weapons: IconWeapons,
  journal: IconJournal,
  profile: IconProfile,
};

export function renderSinIcon(sinId, props = {}) {
  const Icon = SIN_ICONS[sinId];
  return Icon ? <Icon {...props} /> : null;
}

export function renderClassIcon(classId, props = {}) {
  const Icon = CLASS_ICONS[classId];
  return Icon ? <Icon {...props} /> : null;
}