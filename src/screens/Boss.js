import { useState, useEffect } from 'react';
import { colors, fonts, getClassById, hexToRgba } from '../styles/theme';
import { supabase } from '../supabase';
import { CLASS_ICONS } from '../styles/icons';

// Daily boss names — cycles based on day of year
const BOSS_ROSTER = [
  { name: 'Idle Wraith', title: 'Herald of Procrastination', tier: 'common' },
  { name: 'Gloom Specter', title: 'The Doubt Bringer', tier: 'common' },
  { name: 'Dread Imp', title: 'Whisper of Excuses', tier: 'common' },
  { name: 'Hollow Sentinel', title: 'Guardian of Comfort Zones', tier: 'common' },
  { name: 'Rot Fiend', title: 'Feeder of Bad Habits', tier: 'common' },
  { name: 'Spite Shade', title: 'Echo of Yesterday', tier: 'uncommon' },
  { name: 'Vex Phantom', title: 'The Distraction', tier: 'uncommon' },
  { name: 'Numb Revenant', title: 'Thief of Motivation', tier: 'uncommon' },
  { name: 'Blight Stalker', title: 'Corruptor of Routines', tier: 'uncommon' },
  { name: 'Sorrow Knight', title: 'Champion of Giving Up', tier: 'rare' },
  { name: 'Void Tyrant', title: 'Lord of Wasted Potential', tier: 'rare' },
  { name: 'Ash Colossus', title: 'The Burnout', tier: 'rare' },
  { name: 'Doom Warden', title: 'Keeper of Zero Days', tier: 'epic' },
  { name: 'Oblivion King', title: 'Ruler of the Unchanged', tier: 'epic' },
];

const TIER_COLORS = {
  common: '#8888b0',
  uncommon: '#22c55e',
  rare: '#818cf8',
  epic: '#a855f7',
  legendary: '#fbbf24',
};

const TIER_XP = {
  common: 25,
  uncommon: 40,
  rare: 60,
  epic: 100,
};

function getDailyBoss() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return BOSS_ROSTER[dayOfYear % BOSS_ROSTER.length];
}

// Boss skull icon
function BossSkull({ size = 48, color = '#ef4444', defeated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: defeated ? 0.3 : 1, transition: 'opacity 0.5s' }}>
      {/* Skull outline */}
      <path d="M24 6c-8 0-14 6-14 13 0 4 2 7.5 5 10v5h18v-5c3-2.5 5-6 5-10 0-7-6-13-14-13z"
        stroke={color} strokeWidth="1.5" fill={defeated ? hexToRgba(color, 0.05) : hexToRgba(color, 0.08)} strokeLinejoin="round"/>
      {/* Eyes */}
      <ellipse cx="18" cy="20" rx="3" ry="3.5" stroke={color} strokeWidth="1" fill={defeated ? 'none' : hexToRgba(color, 0.15)}/>
      <ellipse cx="30" cy="20" rx="3" ry="3.5" stroke={color} strokeWidth="1" fill={defeated ? 'none' : hexToRgba(color, 0.15)}/>
      {/* Eye dots */}
      {!defeated && <>
        <circle cx="18" cy="20" r="1" fill={color} opacity="0.5"/>
        <circle cx="30" cy="20" r="1" fill={color} opacity="0.5"/>
      </>}
      {/* Nose */}
      <path d="M22 25l2 3 2-3" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      {/* Teeth */}
      <path d="M18 30h12" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <path d="M20 30v3M24 30v3M28 30v3" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity={defeated ? '0.2' : '0.5'}/>
      {/* Crown / horns */}
      <path d="M12 14l-2-5M36 14l2-5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 9l2.5 1M38 9l-2.5 1" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
      {/* Cracks when defeated */}
      {defeated && <>
        <path d="M16 12l3 6-2 4" stroke={color} strokeWidth="0.6" opacity="0.3"/>
        <path d="M32 14l-2 5 1 3" stroke={color} strokeWidth="0.6" opacity="0.3"/>
      </>}
    </svg>
  );
}

// Sword slash icon for attacks
function SlashIcon({ size = 16, color = '#818cf8' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 3h3v3" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


function Boss() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [victoryShown, setVictoryShown] = useState(false);
  const [attackFlash, setAttackFlash] = useState(null);

  const boss = getDailyBoss();
  const tierColor = TIER_COLORS[boss.tier];
  const xpReward = TIER_XP[boss.tier] || 25;

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [profileRes, statsRes, tasksRes] = await Promise.all([
      supabase.from('users_profile').select('*').eq('id', user.id).single(),
      supabase.from('player_stats').select('*').eq('user_id', user.id).single(),
      supabase.from('daily_tasks').select('*').eq('user_id', user.id).order('created_at'),
    ]);

    setProfile(profileRes.data);
    setStats(statsRes.data);

    // Auto-reset if needed
    const today = new Date().toISOString().split('T')[0];
    let fetchedTasks = tasksRes.data || [];
    const needsReset = fetchedTasks.length > 0 && fetchedTasks.some(t => t.task_date !== today);
    if (needsReset) {
      await supabase.from('daily_tasks')
        .update({ completed: false, task_date: today })
        .eq('user_id', user.id);
      fetchedTasks = fetchedTasks.map(t => ({ ...t, completed: false, task_date: today }));
    }
    setTasks(fetchedTasks);
    setLoading(false);
  }

  async function attackBoss(task) {
    if (task.completed) return;

    // Flash effect
    setAttackFlash(task.id);
    setTimeout(() => setAttackFlash(null), 400);

    const { error } = await supabase.from('daily_tasks')
      .update({ completed: true })
      .eq('id', task.id);

    if (!error) {
      const newTasks = tasks.map(t => t.id === task.id ? { ...t, completed: true } : t);
      setTasks(newTasks);

      // Check if ALL tasks complete — boss defeated
      const allDone = newTasks.every(t => t.completed);
      if (allDone && newTasks.length > 0) {
        setVictoryShown(true);
        // Grant XP
        const { data: { user } } = await supabase.auth.getUser();
        const newXp = (stats?.xp || 0) + xpReward;
        const newLevel = stats?.level || 1;
        // Simple level up: every 100 XP
        let finalXp = newXp;
        let finalLevel = newLevel;
        if (finalXp >= 100) {
          finalLevel += Math.floor(finalXp / 100);
          finalXp = finalXp % 100;
        }
        await supabase.from('player_stats').update({
          xp: finalXp, level: finalLevel,
          updated_at: new Date().toISOString(),
        }).eq('user_id', user.id);
        setStats(prev => ({ ...prev, xp: finalXp, level: finalLevel }));
      }
    }
  }

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: colors.primary, fontFamily: fonts.mono, fontSize: '11px', letterSpacing: '4px' }}>LOADING...</span>
      </div>
    );
  }

  const playerClass = getClassById(profile?.class);
  const ClassIcon = CLASS_ICONS[profile?.class] || CLASS_ICONS.warrior;
  const totalHp = tasks.length;
  const currentHp = tasks.filter(t => !t.completed).length;
  const defeated = currentHp === 0 && totalHp > 0;
  const hpPct = totalHp > 0 ? (currentHp / totalHp) * 100 : 100;

  // HP bar color changes as boss weakens
  const hpColor = hpPct > 50 ? colors.hp : hpPct > 25 ? colors.warning : '#22c55e';

  return (
    <div style={{ fontFamily: fonts.body, paddingBottom: '1rem' }}>

      {/* HEADER */}
      <div style={{ padding: '14px 18px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', fontWeight: 600 }}>DAILY BOSS</div>
        <div style={{ fontSize: '9px', color: colors.textDim, fontFamily: fonts.mono }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* BOSS ARENA */}
      <div style={{
        margin: '0 18px', padding: '24px 16px',
        background: `radial-gradient(ellipse at center top, ${hexToRgba(colors.hp, defeated ? 0.02 : 0.06)} 0%, transparent 70%)`,
        borderRadius: '12px',
        border: `1px solid ${hexToRgba(defeated ? '#22c55e' : colors.hp, 0.12)}`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s',
      }}>
        {/* Attack flash overlay */}
        {attackFlash && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at center, ${hexToRgba(playerClass.color, 0.15)} 0%, transparent 60%)`,
            pointerEvents: 'none',
            animation: 'fadeIn 0.1s ease-out',
          }} />
        )}

        {/* Tier badge */}
        <div style={{
          display: 'inline-block', padding: '3px 12px', borderRadius: '10px',
          background: hexToRgba(tierColor, 0.1),
          border: `1px solid ${hexToRgba(tierColor, 0.25)}`,
          fontSize: '9px', color: tierColor, letterSpacing: '2px', fontWeight: 600,
          textTransform: 'uppercase', marginBottom: '16px',
        }}>
          {boss.tier}
        </div>

        {/* Boss icon */}
        <div style={{ margin: '0 auto 12px', position: 'relative' }}>
          <BossSkull size={64} color={defeated ? '#22c55e' : colors.hp} defeated={defeated} />
          {defeated && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Boss name */}
        <div style={{
          fontSize: '22px', fontWeight: 700, letterSpacing: '2px',
          color: defeated ? colors.textDead : colors.text,
          textDecoration: defeated ? 'line-through' : 'none',
          transition: 'color 0.5s',
        }}>
          {boss.name}
        </div>
        <div style={{
          fontSize: '11px', color: defeated ? colors.textDead : colors.textMid,
          fontStyle: 'italic', marginTop: '2px',
        }}>
          {boss.title}
        </div>

        {/* HP BAR */}
        <div style={{ margin: '18px 0 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px', fontFamily: fonts.mono }}>
            <span style={{ color: defeated ? '#22c55e' : colors.hp, fontWeight: 600 }}>
              {defeated ? 'DEFEATED' : 'BOSS HP'}
            </span>
            <span style={{ color: colors.textDim }}>
              {currentHp} / {totalHp}
            </span>
          </div>
          <div style={{
            height: '8px', background: colors.surface2, borderRadius: '4px',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              width: `${hpPct}%`, height: '100%',
              background: defeated ? '#22c55e' : `linear-gradient(90deg, ${hpColor}, ${hexToRgba(hpColor, 0.7)})`,
              borderRadius: '4px',
              transition: 'width 0.4s ease, background 0.4s',
              boxShadow: defeated ? 'none' : `0 0 10px ${hexToRgba(hpColor, 0.4)}`,
            }} />
          </div>
        </div>

        {/* XP reward preview */}
        <div style={{
          fontSize: '10px', color: colors.textDim, fontFamily: fonts.mono,
          marginTop: '4px',
        }}>
          Reward: <span style={{ color: colors.gold, fontWeight: 600 }}>+{xpReward} XP</span> on defeat
        </div>
      </div>

      {/* VICTORY BANNER */}
      {defeated && victoryShown && (
        <div style={{
          margin: '12px 18px', padding: '16px',
          background: hexToRgba('#22c55e', 0.06),
          border: `1px solid ${hexToRgba('#22c55e', 0.2)}`,
          borderRadius: '10px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e', letterSpacing: '2px', marginBottom: '4px' }}>
            BOSS DEFEATED
          </div>
          <div style={{ fontSize: '12px', color: colors.textMid, marginBottom: '8px' }}>
            You conquered {boss.name} — all tasks complete.
          </div>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '6px',
            background: hexToRgba(colors.gold, 0.1),
            border: `1px solid ${hexToRgba(colors.gold, 0.25)}`,
            fontSize: '13px', color: colors.gold, fontWeight: 600, fontFamily: fonts.mono,
          }}>
            +{xpReward} XP EARNED
          </div>
        </div>
      )}

      {/* ATTACK LIST (tasks) */}
      <div style={{ padding: '16px 18px 0' }}>
        <div style={{
          fontSize: '9px', color: colors.textDim, letterSpacing: '2px', fontWeight: 600,
          marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>ATTACKS</span>
          <span style={{ fontFamily: fonts.mono, color: colors.primary }}>
            {tasks.filter(t => t.completed).length}/{tasks.length} landed
          </span>
        </div>

        {tasks.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '32px 0',
            color: colors.textDim, fontSize: '11px', letterSpacing: '1px', lineHeight: 1.8,
          }}>
            No daily objectives set.<br />
            <span style={{ color: colors.textMid }}>Set your tasks on the Home screen first.</span>
          </div>
        )}

        {tasks.map((task, i) => {
          const isCompleted = task.completed;
          const isFlashing = attackFlash === task.id;

          return (
            <div
              key={task.id}
              onClick={() => attackBoss(task)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px',
                marginBottom: '6px',
                background: isFlashing
                  ? hexToRgba(playerClass.color, 0.12)
                  : isCompleted
                    ? hexToRgba('#22c55e', 0.04)
                    : colors.surface,
                border: `1px solid ${isCompleted ? hexToRgba('#22c55e', 0.15) : colors.border}`,
                borderRadius: '8px',
                cursor: isCompleted ? 'default' : 'pointer',
                transition: 'all 0.15s',
                opacity: isCompleted ? 0.7 : 1,
              }}
            >
              {/* Attack number */}
              <div style={{
                width: '28px', height: '28px', borderRadius: '6px',
                background: isCompleted
                  ? hexToRgba('#22c55e', 0.1)
                  : hexToRgba(playerClass.color, 0.08),
                border: `1px solid ${isCompleted ? hexToRgba('#22c55e', 0.2) : hexToRgba(playerClass.color, 0.15)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8.5l3 3 5-6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <SlashIcon size={14} color={playerClass.color} />
                )}
              </div>

              {/* Task name */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px', fontWeight: 500,
                  color: isCompleted ? colors.textDead : colors.text,
                  textDecoration: isCompleted ? 'line-through' : 'none',
                }}>
                  {task.name}
                </div>
                {!isCompleted && (
                  <div style={{ fontSize: '9px', color: colors.textDim, marginTop: '2px' }}>
                    Tap to attack — deals 1 damage
                  </div>
                )}
                {isCompleted && (
                  <div style={{ fontSize: '9px', color: '#22c55e', marginTop: '2px', fontWeight: 500 }}>
                    Hit landed — 1 damage dealt
                  </div>
                )}
              </div>

              {/* Damage indicator */}
              <div style={{
                fontSize: '12px', fontFamily: fonts.mono, fontWeight: 600,
                color: isCompleted ? '#22c55e' : colors.hp,
              }}>
                {isCompleted ? '✓' : '-1 HP'}
              </div>
            </div>
          );
        })}
      </div>

      {/* YOUR FIGHTER */}
      <div style={{
        margin: '16px 18px 0', padding: '10px 14px',
        background: hexToRgba(playerClass.color, 0.04),
        border: `1px solid ${hexToRgba(playerClass.color, 0.12)}`,
        borderRadius: '8px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '6px',
          background: hexToRgba(playerClass.color, 0.1),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ClassIcon size={18} color={playerClass.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', color: colors.text, fontWeight: 600 }}>
            {profile?.username}
          </div>
          <div style={{ fontSize: '10px', color: colors.textDim }}>
            {playerClass.name} — Lv {stats?.level || 1}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: colors.textDim, fontFamily: fonts.mono }}>
            XP: <span style={{ color: colors.primary }}>{stats?.xp || 0}/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boss;