import { useState, useEffect, useRef } from 'react';
import { colors, fonts, hexToRgba, getClassById } from '../styles/theme';
import { supabase } from '../supabase';
import { CLASS_ICONS } from '../styles/icons';

// ============================================================
// WEAPON DATABASE
// ============================================================
const RARITIES = {
  common:    { label: 'COMMON',    color: '#8888b0', glow: 'rgba(136,136,176,0.2)', weight: 50 },
  uncommon:  { label: 'UNCOMMON',  color: '#22c55e', glow: 'rgba(34,197,94,0.25)',  weight: 28 },
  rare:      { label: 'RARE',      color: '#818cf8', glow: 'rgba(129,140,248,0.3)', weight: 14 },
  epic:      { label: 'EPIC',      color: '#a855f7', glow: 'rgba(168,85,247,0.35)', weight: 6  },
  legendary: { label: 'LEGENDARY', color: '#fbbf24', glow: 'rgba(251,191,36,0.4)',  weight: 2  },
};

const WEAPONS = [
  // COMMON
  { id: 'iron_dagger',     name: 'Iron Dagger',       rarity: 'common',    effect: '+2% XP gain',               desc: 'A simple blade. Better than nothing.' },
  { id: 'wooden_staff',    name: 'Wooden Staff',      rarity: 'common',    effect: '+1 streak shield/month',    desc: 'Rough-hewn and reliable.' },
  { id: 'rusty_mace',      name: 'Rusty Mace',        rarity: 'common',    effect: '+3% task completion bonus', desc: 'It gets the job done. Barely.' },
  { id: 'cloth_wrap',      name: 'Cloth Hand Wraps',  rarity: 'common',    effect: '+1% persistence decay resist', desc: 'Worn but familiar.' },
  // UNCOMMON
  { id: 'steel_sword',     name: 'Steel Longsword',   rarity: 'uncommon',  effect: '+5% XP gain',               desc: 'Forged with purpose. A warrior\'s friend.' },
  { id: 'sapphire_wand',   name: 'Sapphire Wand',     rarity: 'uncommon',  effect: '+8% journal XP bonus',      desc: 'Hums with faint arcane energy.' },
  { id: 'shadow_knives',   name: 'Shadow Knives',     rarity: 'uncommon',  effect: '+10% danger window rewards', desc: 'Quiet. Quick. Precise.' },
  { id: 'iron_shield',     name: 'Iron Buckler',      rarity: 'uncommon',  effect: '+1 streak shield/week',     desc: 'Blocks one moment of weakness.' },
  // RARE
  { id: 'frost_blade',     name: 'Frostburn Edge',    rarity: 'rare',      effect: '+12% XP gain',              desc: 'Cold enough to freeze your doubts.' },
  { id: 'ember_staff',     name: 'Ember Staff',       rarity: 'rare',      effect: '+15% journal XP bonus',     desc: 'Smolders with inner fire.' },
  { id: 'venom_daggers',   name: 'Venom Fangs',       rarity: 'rare',      effect: 'Boss takes 2x DMG on last hit', desc: 'The final strike always bites hardest.' },
  { id: 'holy_tome',       name: 'Tome of Renewal',   rarity: 'rare',      effect: 'Recovery time -25%',        desc: 'Words that mend the spirit.' },
  // EPIC
  { id: 'void_scythe',     name: 'Void Scythe',       rarity: 'epic',      effect: '+25% XP gain',              desc: 'Harvests power from the abyss itself.' },
  { id: 'storm_gauntlets',  name: 'Stormbreak Gauntlets', rarity: 'epic',  effect: '2x streak milestone rewards', desc: 'Thunder answers to discipline.' },
  { id: 'crystal_orb',     name: 'Orb of Clarity',    rarity: 'epic',      effect: 'All virtue stats +10%',     desc: 'See yourself as you truly are.' },
  // LEGENDARY
  { id: 'soul_reaver',     name: 'Soulreaver',        rarity: 'legendary', effect: '+50% XP gain, streak never fully resets', desc: 'Forged from a thousand conquered days. Your discipline made manifest.' },
  { id: 'crown_of_will',   name: 'Crown of Iron Will', rarity: 'legendary', effect: 'All effects doubled, +3 streak shields/week', desc: 'The final reward for those who refused to break.' },
];

// ============================================================
// WEAPON SVG ICONS (placeholder until pixel art)
// ============================================================
function WeaponIcon({ type = 'sword', size = 48, color = '#818cf8' }) {
  const icons = {
    dagger: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M24 6l-2 22 2 4 2-4z" stroke={color} strokeWidth="1.2" fill={hexToRgba(color, 0.08)} strokeLinejoin="round"/>
        <path d="M18 26h12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 28l2 8 2-8" stroke={color} strokeWidth="1" fill={hexToRgba(color, 0.06)} strokeLinejoin="round"/>
        <circle cx="24" cy="14" r="1.5" fill={color} opacity="0.3"/>
      </svg>
    ),
    sword: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M24 4v28" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M20 8l4-4 4 4" stroke={color} strokeWidth="1" fill={hexToRgba(color, 0.1)} strokeLinejoin="round"/>
        <path d="M16 32h16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 32v8M26 32v8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M20 40h8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="24" cy="16" r="2" stroke={color} strokeWidth="0.8" fill={hexToRgba(color, 0.12)}/>
      </svg>
    ),
    staff: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M24 10v32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="10" r="5" stroke={color} strokeWidth="1.2" fill={hexToRgba(color, 0.08)}/>
        <circle cx="24" cy="10" r="2" fill={color} opacity="0.25"/>
        <path d="M19.5 14l-3 2M28.5 14l3 2" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <circle cx="22" cy="7" r="0.5" fill={color} opacity="0.3"/>
        <circle cx="27" cy="8" r="0.5" fill={color} opacity="0.3"/>
      </svg>
    ),
    knives: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M16 8l-1 20 1 3 1-3z" stroke={color} strokeWidth="1" fill={hexToRgba(color, 0.06)} strokeLinejoin="round"/>
        <path d="M32 8l-1 20 1 3 1-3z" stroke={color} strokeWidth="1" fill={hexToRgba(color, 0.06)} strokeLinejoin="round"/>
        <path d="M13 28h6M29 28h6" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M15 31l1 6M31 31l1 6" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
        <ellipse cx="24" cy="20" rx="4" ry="2" stroke={color} strokeWidth="0.7" fill={hexToRgba(color, 0.06)} opacity="0.5"/>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M24 6l-12 6v12c0 8 5 13 12 16 7-3 12-8 12-16V12z" stroke={color} strokeWidth="1.2" fill={hexToRgba(color, 0.06)} strokeLinejoin="round"/>
        <path d="M24 12l-7 3.5v7c0 5 3 8.5 7 10.5 4-2 7-5.5 7-10.5v-7z" stroke={color} strokeWidth="0.8" fill={hexToRgba(color, 0.05)} strokeLinejoin="round"/>
        <path d="M24 16v10M20 22h8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    scythe: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M20 8v34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 8c0 0 14-2 16 8-6-2-12 0-16 4" stroke={color} strokeWidth="1.2" fill={hexToRgba(color, 0.08)} strokeLinejoin="round"/>
        <circle cx="32" cy="12" r="1" fill={color} opacity="0.3"/>
        <path d="M18 40h4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    orb: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="20" r="10" stroke={color} strokeWidth="1.2" fill={hexToRgba(color, 0.06)}/>
        <circle cx="24" cy="20" r="6" stroke={color} strokeWidth="0.8" fill={hexToRgba(color, 0.08)}/>
        <circle cx="24" cy="20" r="2.5" fill={color} opacity="0.2"/>
        <path d="M22 32h4v6h-4z" stroke={color} strokeWidth="0.8" fill={hexToRgba(color, 0.05)}/>
        <path d="M19 38h10" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M20 14l1 1M27 15l1-1" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    crown: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M10 30l4-14 5 8 5-12 5 12 5-8 4 14z" stroke={color} strokeWidth="1.2" fill={hexToRgba(color, 0.08)} strokeLinejoin="round"/>
        <path d="M10 30h28v4H10z" stroke={color} strokeWidth="1" fill={hexToRgba(color, 0.06)}/>
        <circle cx="24" cy="20" r="1.5" fill={color} opacity="0.3"/>
        <circle cx="16" cy="24" r="1" fill={color} opacity="0.2"/>
        <circle cx="32" cy="24" r="1" fill={color} opacity="0.2"/>
        <path d="M14 36h20" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  };

  // Map weapon IDs to icon types
  const typeMap = {
    iron_dagger: 'dagger', cloth_wrap: 'dagger', wooden_staff: 'staff', rusty_mace: 'sword',
    steel_sword: 'sword', sapphire_wand: 'staff', shadow_knives: 'knives', iron_shield: 'shield',
    frost_blade: 'sword', ember_staff: 'staff', venom_daggers: 'knives', holy_tome: 'orb',
    void_scythe: 'scythe', storm_gauntlets: 'knives', crystal_orb: 'orb',
    soul_reaver: 'scythe', crown_of_will: 'crown',
  };

  return icons[typeMap[type] || type] || icons.sword;
}

// ============================================================
// GACHA PULL ANIMATION
// ============================================================
function GachaPull({ weapon, rarity, onClose }) {
  const [phase, setPhase] = useState(0); // 0=flash, 1=reveal, 2=details

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const r = RARITIES[rarity];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: phase === 0 ? '#fff' : '#080b14',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'background 0.5s',
      fontFamily: fonts.body,
    }}>
      {/* Phase 0: white flash */}
      {phase === 0 && (
        <div style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: r.color,
          boxShadow: `0 0 120px 60px ${r.glow}, 0 0 240px 120px ${r.glow}`,
        }} />
      )}

      {/* Phase 1+: Reveal */}
      {phase >= 1 && (
        <div style={{
          textAlign: 'center',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 0.5s ease-out',
        }}>
          {/* Rarity beam */}
          <div style={{
            width: '2px', height: '120px', margin: '0 auto 20px',
            background: `linear-gradient(180deg, transparent, ${r.color}, transparent)`,
            opacity: 0.4,
          }} />

          {/* Weapon icon */}
          <div style={{
            width: '96px', height: '96px', margin: '0 auto 16px',
            borderRadius: '20px',
            background: `radial-gradient(circle, ${hexToRgba(r.color, 0.12)} 0%, transparent 70%)`,
            border: `1px solid ${hexToRgba(r.color, 0.3)}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 40px ${r.glow}`,
          }}>
            <WeaponIcon type={weapon.id} size={56} color={r.color} />
          </div>

          {/* Rarity badge */}
          <div style={{
            display: 'inline-block', padding: '4px 16px', borderRadius: '12px',
            background: hexToRgba(r.color, 0.12),
            border: `1px solid ${hexToRgba(r.color, 0.3)}`,
            fontSize: '11px', color: r.color, letterSpacing: '3px', fontWeight: 700,
            marginBottom: '12px',
          }}>
            {r.label}
          </div>

          {/* Weapon name */}
          <div style={{
            fontSize: '26px', fontWeight: 700, color: r.color,
            letterSpacing: '2px', marginBottom: '6px',
          }}>
            {weapon.name}
          </div>

          {/* Phase 2: Details */}
          {phase >= 2 && (
            <div style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: 'opacity 0.4s',
            }}>
              <div style={{
                fontSize: '13px', color: colors.textMid,
                fontStyle: 'italic', marginBottom: '16px',
                maxWidth: '280px', margin: '0 auto 16px', lineHeight: 1.5,
              }}>
                "{weapon.desc}"
              </div>

              <div style={{
                display: 'inline-block', padding: '8px 20px', borderRadius: '8px',
                background: hexToRgba(r.color, 0.08),
                border: `1px solid ${hexToRgba(r.color, 0.2)}`,
                fontSize: '13px', color: r.color, fontWeight: 600,
                fontFamily: fonts.mono, marginBottom: '32px',
              }}>
                {weapon.effect}
              </div>

              <div>
                <button onClick={onClose} style={{
                  background: colors.primary, color: '#080b14', border: 'none',
                  padding: '14px 40px', fontFamily: fonts.heading, fontSize: '14px',
                  fontWeight: 600, letterSpacing: '2px', cursor: 'pointer',
                  borderRadius: '8px', textTransform: 'uppercase',
                }}>
                  CLAIM
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ============================================================
// WEAPONS PAGE
// ============================================================
function Weapons() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [pullResult, setPullResult] = useState(null);
  const [canPull, setCanPull] = useState(true);
  const intervalRef = useRef(null);

  // Featured weapons for showcase (rotating)
  const featured = WEAPONS.filter(w => ['rare', 'epic', 'legendary'].includes(w.rarity));

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(() => {
      setShowcaseIndex(prev => (prev + 1) % featured.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [profileRes, statsRes] = await Promise.all([
      supabase.from('users_profile').select('*').eq('id', user.id).single(),
      supabase.from('player_stats').select('*').eq('user_id', user.id).single(),
    ]);
    setProfile(profileRes.data);
    setStats(statsRes.data);
    setLoading(false);
  }

  function rollWeapon() {
    // Weighted random based on rarity
    const totalWeight = Object.values(RARITIES).reduce((s, r) => s + r.weight, 0);
    let roll = Math.random() * totalWeight;
    let selectedRarity = 'common';

    for (const [rarity, data] of Object.entries(RARITIES)) {
      roll -= data.weight;
      if (roll <= 0) { selectedRarity = rarity; break; }
    }

    const pool = WEAPONS.filter(w => w.rarity === selectedRarity);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function handlePull() {
    if (!canPull || pulling) return;
    const weapon = rollWeapon();
    setPulling(true);
    setPullResult(weapon);
  }

  function handleClaimPull() {
    setPulling(false);
    setPullResult(null);
    setCanPull(false); // Daily pull used
  }

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: colors.primary, fontFamily: fonts.mono, fontSize: '11px', letterSpacing: '4px' }}>LOADING...</span>
      </div>
    );
  }

  const currentFeatured = featured[showcaseIndex];
  const featuredRarity = RARITIES[currentFeatured.rarity];
  const playerClass = getClassById(profile?.class);

  return (
    <div style={{ fontFamily: fonts.body, paddingBottom: '1rem' }}>

      {/* Pull overlay */}
      {pulling && pullResult && (
        <GachaPull
          weapon={pullResult}
          rarity={pullResult.rarity}
          onClose={handleClaimPull}
        />
      )}

      {/* HEADER */}
      <div style={{ padding: '14px 18px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', fontWeight: 600 }}>ARMORY</div>
        <div style={{ fontSize: '9px', color: colors.textDim, fontFamily: fonts.mono }}>
          Lv <span style={{ color: colors.gold, fontWeight: 600 }}>{stats?.level || 1}</span>
        </div>
      </div>

      {/* WEAPON SHOWCASE — rotating display */}
      <div style={{
        margin: '8px 18px 0',
        background: `radial-gradient(ellipse at center top, ${hexToRgba(featuredRarity.color, 0.08)} 0%, transparent 70%)`,
        border: `1px solid ${hexToRgba(featuredRarity.color, 0.12)}`,
        borderRadius: '14px',
        padding: '24px 20px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '240px',
      }}>
        {/* Background particles */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '200px', height: '200px', borderRadius: '50%',
          background: `radial-gradient(circle, ${hexToRgba(featuredRarity.color, 0.06)} 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        {/* Featured label */}
        <div style={{
          fontSize: '8px', color: colors.textDim, letterSpacing: '3px', fontWeight: 600,
          marginBottom: '16px',
        }}>
          FEATURED WEAPONS
        </div>

        {/* Weapon display */}
        <div style={{
          width: '80px', height: '80px', margin: '0 auto 14px',
          borderRadius: '16px',
          background: hexToRgba(featuredRarity.color, 0.06),
          border: `1px solid ${hexToRgba(featuredRarity.color, 0.2)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 30px ${featuredRarity.glow}`,
          transition: 'all 0.5s',
        }}>
          <WeaponIcon type={currentFeatured.id} size={48} color={featuredRarity.color} />
        </div>

        {/* Rarity */}
        <div style={{
          display: 'inline-block', padding: '3px 12px', borderRadius: '10px',
          background: hexToRgba(featuredRarity.color, 0.1),
          border: `1px solid ${hexToRgba(featuredRarity.color, 0.25)}`,
          fontSize: '9px', color: featuredRarity.color, letterSpacing: '2px', fontWeight: 700,
          marginBottom: '8px',
        }}>
          {featuredRarity.label}
        </div>

        {/* Name */}
        <div style={{
          fontSize: '20px', fontWeight: 700, color: featuredRarity.color,
          letterSpacing: '1px', marginBottom: '4px',
          transition: 'color 0.5s',
        }}>
          {currentFeatured.name}
        </div>

        {/* Effect */}
        <div style={{
          fontSize: '11px', color: colors.textMid, fontFamily: fonts.mono,
          marginBottom: '4px',
        }}>
          {currentFeatured.effect}
        </div>

        {/* Dots indicator */}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '14px' }}>
          {featured.map((_, i) => (
            <div key={i} style={{
              width: i === showcaseIndex ? '16px' : '4px',
              height: '4px', borderRadius: '2px',
              background: i === showcaseIndex ? featuredRarity.color : colors.surface2,
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* DAILY PULL BUTTON */}
      <div style={{ padding: '16px 18px' }}>
        <button
          onClick={handlePull}
          disabled={!canPull}
          style={{
            width: '100%', padding: '16px',
            background: canPull
              ? 'linear-gradient(135deg, #818cf8, #a855f7, #c084fc)'
              : colors.surface,
            border: canPull ? 'none' : `1px solid ${colors.border}`,
            color: canPull ? '#fff' : colors.textDim,
            fontFamily: fonts.heading, fontSize: '16px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            cursor: canPull ? 'pointer' : 'not-allowed',
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {canPull && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              animation: 'shimmer 2s infinite',
              pointerEvents: 'none',
            }} />
          )}
          {canPull ? 'DAILY PULL — FREE' : 'PULL USED — RESETS AT MIDNIGHT'}
        </button>

        {canPull && (
          <div style={{
            textAlign: 'center', marginTop: '8px',
            fontSize: '10px', color: colors.textDim, fontFamily: fonts.mono,
          }}>
            1 free pull per day — tap to draw a weapon
          </div>
        )}
      </div>

      {/* DROP RATES */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{
          fontSize: '9px', color: colors.textDim, letterSpacing: '2px',
          fontWeight: 600, marginBottom: '10px',
        }}>
          DROP RATES
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {Object.entries(RARITIES).map(([key, r]) => (
            <div key={key} style={{
              flex: 1, minWidth: '55px',
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: '6px', padding: '8px', textAlign: 'center',
            }}>
              <div style={{
                fontSize: '13px', fontWeight: 700, color: r.color,
                fontFamily: fonts.mono,
              }}>
                {r.weight}%
              </div>
              <div style={{
                fontSize: '7px', color: r.color, letterSpacing: '1px',
                fontWeight: 600, marginTop: '2px', opacity: 0.7,
              }}>
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', background: colors.border, margin: '4px 18px 12px' }} />

      {/* ALL WEAPONS CATALOG */}
      <div style={{ padding: '0 18px' }}>
        <div style={{
          fontSize: '9px', color: colors.textDim, letterSpacing: '2px',
          fontWeight: 600, marginBottom: '12px',
        }}>
          WEAPON CATALOG — {WEAPONS.length} WEAPONS
        </div>

        {['legendary', 'epic', 'rare', 'uncommon', 'common'].map(rarity => {
          const weapons = WEAPONS.filter(w => w.rarity === rarity);
          const r = RARITIES[rarity];
          if (weapons.length === 0) return null;

          return (
            <div key={rarity} style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '8px', color: r.color, letterSpacing: '2px',
                fontWeight: 700, marginBottom: '6px', opacity: 0.7,
              }}>
                {r.label}
              </div>
              {weapons.map(weapon => (
                <div key={weapon.id} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px',
                  background: colors.surface,
                  border: `1px solid ${hexToRgba(r.color, 0.1)}`,
                  borderRadius: '8px', marginBottom: '4px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: hexToRgba(r.color, 0.06),
                    border: `1px solid ${hexToRgba(r.color, 0.15)}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <WeaponIcon type={weapon.id} size={22} color={r.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '12px', fontWeight: 600, color: r.color,
                      marginBottom: '2px',
                    }}>
                      {weapon.name}
                    </div>
                    <div style={{
                      fontSize: '10px', color: colors.textMid,
                      fontFamily: fonts.mono, fontWeight: 500,
                    }}>
                      {weapon.effect}
                    </div>
                  </div>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: r.color, opacity: 0.4, flexShrink: 0,
                  }} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default Weapons;