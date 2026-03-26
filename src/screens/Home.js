import { useState, useEffect } from 'react';
import { colors, fonts, getClassById, getSinById, hexToRgba } from '../styles/theme';
import { supabase } from '../supabase';
import { CLASS_ICONS, SIN_ICONS, IconPlus } from '../styles/icons';

// ============================================================
// ONBOARDING COMPONENT
// ============================================================
function Onboarding({ profile, stats, streak, onComplete }) {
  const [step, setStep] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const playerSin = getSinById(streak?.vice);

  async function addTask() {
    if (!newTask.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('daily_tasks').insert({
      user_id: user.id, name: newTask.trim(), bonus: 10,
      task_type: 'atk', completed: false,
      task_date: new Date().toISOString().split('T')[0],
    }).select().single();
    if (!error && data) {
      setTasks(prev => [...prev, data]);
      setNewTask('');
    }
  }

  function removeTask(id) {
    supabase.from('daily_tasks').delete().eq('id', id).then(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
    });
  }

  async function handleViceAnswer(gaveIn) {
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (gaveIn) {
      await supabase.from('streaks').update({
        current_streak: 0,
        last_check_in: new Date().toISOString().split('T')[0],
      }).eq('user_id', user.id);
      await supabase.from('player_stats').update({
        persistence: 0, updated_at: new Date().toISOString(),
      }).eq('user_id', user.id);
    } else {
      await supabase.from('streaks').update({
        current_streak: 1,
        longest_streak: Math.max(streak.longest_streak || 0, 1),
        last_check_in: new Date().toISOString().split('T')[0],
      }).eq('user_id', user.id);
      await supabase.from('player_stats').update({
        persistence: 100, updated_at: new Date().toISOString(),
      }).eq('user_id', user.id);
    }
    setSubmitting(false);
    onComplete();
  }

  if (step === 1) {
    return (
      <div style={{ padding: '24px 18px', fontFamily: fonts.body }}>
        <div style={{ textAlign: 'center', marginBottom: '32px', paddingTop: '20px' }}>
          <div style={{ fontSize: '11px', color: colors.primary, letterSpacing: '4px', marginBottom: '8px', fontWeight: 600 }}>SETUP</div>
          <div style={{ fontSize: '22px', color: colors.text, fontWeight: 700, letterSpacing: '1px', marginBottom: '6px' }}>Set your daily objectives</div>
          <div style={{ fontSize: '13px', color: colors.textMid, lineHeight: 1.6 }}>
            What do you want to accomplish every day? These tasks deal damage to bosses and level you up. Set at least 5.
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          {tasks.map((task, i) => (
            <div key={task.id} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', marginBottom: '6px',
              background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '6px',
            }}>
              <span style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: hexToRgba(colors.primary, 0.1), color: colors.primary,
                fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: fonts.mono, flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: '13px', color: colors.text, fontWeight: 500 }}>{task.name}</span>
              <span onClick={() => removeTask(task.id)} style={{ fontSize: '12px', color: colors.textDim, cursor: 'pointer', padding: '0 4px' }}>✕</span>
            </div>
          ))}
        </div>
        {tasks.length < 10 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <input value={newTask} onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder={tasks.length === 0 ? 'e.g. Hit the gym' : tasks.length < 5 ? `Task ${tasks.length + 1} of 5...` : 'Add more (optional)...'}
              style={{
                flex: 1, background: colors.surface2, border: `1px solid ${colors.borderAccent}`,
                color: colors.text, padding: '10px 12px', fontFamily: fonts.body,
                fontSize: '13px', fontWeight: 500, outline: 'none', borderRadius: '6px',
              }}
            />
            <button onClick={addTask} style={{
              background: colors.primary, color: '#080b14', border: 'none',
              padding: '10px 16px', fontFamily: fonts.heading, fontSize: '12px',
              cursor: 'pointer', borderRadius: '6px', fontWeight: 600,
            }}>ADD</button>
          </div>
        )}
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} style={{
              width: '32px', height: '4px', borderRadius: '2px',
              background: tasks.length >= n ? colors.primary : colors.surface2,
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: colors.textMid, marginBottom: '20px', fontFamily: fonts.mono }}>
          {tasks.length}/5 tasks set
        </div>
        <button onClick={() => tasks.length >= 5 && setStep(2)} style={{
          background: tasks.length >= 5 ? colors.primary : colors.surface,
          color: tasks.length >= 5 ? '#080b14' : colors.textDim,
          border: `1px solid ${tasks.length >= 5 ? colors.primary : colors.border}`,
          padding: '14px', fontFamily: fonts.heading, fontSize: '13px', fontWeight: 600,
          letterSpacing: '2px', cursor: tasks.length >= 5 ? 'pointer' : 'not-allowed',
          width: '100%', borderRadius: '6px', textTransform: 'uppercase',
        }}>
          {tasks.length >= 5 ? 'CONTINUE →' : `ADD ${5 - tasks.length} MORE TASK${5 - tasks.length === 1 ? '' : 'S'}`}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '24px 18px', fontFamily: fonts.body,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '80vh',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '320px' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px',
          background: hexToRgba(playerSin.color, 0.08),
          border: `1px solid ${hexToRgba(playerSin.color, 0.2)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          {SIN_ICONS[streak?.vice] && (() => {
            const Icon = SIN_ICONS[streak.vice];
            return <Icon size={36} color={playerSin.color} />;
          })()}
        </div>
        <div style={{ fontSize: '11px', color: playerSin.color, letterSpacing: '3px', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>
          {playerSin.sin} — {playerSin.jewel}
        </div>
        <div style={{ fontSize: '20px', color: colors.text, fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
          Have you given in to your vice in the last 24 hours?
        </div>
        <div style={{ fontSize: '13px', color: colors.textMid, marginBottom: '32px', lineHeight: 1.6 }}>
          {playerSin.modern}. Be honest — this is between you and Powercreep.
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => handleViceAnswer(false)} disabled={submitting} style={{
            flex: 1, padding: '16px',
            background: hexToRgba(colors.success, 0.08),
            border: `1px solid ${hexToRgba(colors.success, 0.3)}`,
            color: colors.success, fontFamily: fonts.heading,
            fontSize: '14px', fontWeight: 600, letterSpacing: '1px',
            cursor: 'pointer', borderRadius: '8px', opacity: submitting ? 0.6 : 1,
          }}>I RESISTED</button>
          <button onClick={() => handleViceAnswer(true)} disabled={submitting} style={{
            flex: 1, padding: '16px',
            background: hexToRgba(colors.hp, 0.08),
            border: `1px solid ${hexToRgba(colors.hp, 0.3)}`,
            color: colors.hp, fontFamily: fonts.heading,
            fontSize: '14px', fontWeight: 600, letterSpacing: '1px',
            cursor: 'pointer', borderRadius: '8px', opacity: submitting ? 0.6 : 1,
          }}>I GAVE IN</button>
        </div>
        <div style={{ fontSize: '11px', color: colors.textDim, marginTop: '16px', lineHeight: 1.6 }}>
          "I resisted" = Day 1 clean, Persistence maxed.<br />
          "I gave in" = Counter resets to 0.
        </div>
      </div>
    </div>
  );
}


// ============================================================
// HOME SCREEN — Mockup-matching design
// ============================================================
function Home() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [addingTask, setAddingTask] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);
  const [checkinDone, setCheckinDone] = useState(false);

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [profileRes, statsRes, streakRes, tasksRes] = await Promise.all([
      supabase.from('users_profile').select('*').eq('id', user.id).single(),
      supabase.from('player_stats').select('*').eq('user_id', user.id).single(),
      supabase.from('streaks').select('*').eq('user_id', user.id).single(),
      supabase.from('daily_tasks').select('*').eq('user_id', user.id).order('created_at'),
    ]);

    setProfile(profileRes.data);
    setStats(statsRes.data);
    setStreak(streakRes.data);

    // Auto-reset: if any tasks have a date before today, uncheck them all
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

    const s = streakRes.data;
    const neverCheckedIn = !s?.last_check_in || s.last_check_in === null;
    const isNewUser = neverCheckedIn && s?.current_streak === 0;

    if (isNewUser) {
      setNeedsOnboarding(true);
    } else if (s && s.last_check_in !== today) {
      setShowCheckin(true);
    } else {
      setCheckinDone(true);
    }

    setLoading(false);
  }

  async function handleDailyCheckin(gaveIn) {
    const { data: { user } } = await supabase.auth.getUser();
    if (gaveIn) {
      await supabase.from('streaks').update({
        current_streak: 0, last_check_in: new Date().toISOString().split('T')[0],
      }).eq('user_id', user.id);
      await supabase.from('player_stats').update({
        persistence: 0, updated_at: new Date().toISOString(),
      }).eq('user_id', user.id);
      setStreak(prev => ({ ...prev, current_streak: 0, last_check_in: new Date().toISOString().split('T')[0] }));
      setStats(prev => ({ ...prev, persistence: 0 }));
    } else {
      const newStreak = (streak?.current_streak || 0) + 1;
      const newLongest = Math.max(streak?.longest_streak || 0, newStreak);
      await supabase.from('streaks').update({
        current_streak: newStreak, longest_streak: newLongest,
        last_check_in: new Date().toISOString().split('T')[0],
      }).eq('user_id', user.id);
      await supabase.from('player_stats').update({
        persistence: 100, updated_at: new Date().toISOString(),
      }).eq('user_id', user.id);
      setStreak(prev => ({ ...prev, current_streak: newStreak, longest_streak: newLongest, last_check_in: new Date().toISOString().split('T')[0] }));
      setStats(prev => ({ ...prev, persistence: 100 }));
    }
    setShowCheckin(false);
    setCheckinDone(true);
  }

  async function toggleTask(task) {
    const { error } = await supabase.from('daily_tasks').update({ completed: !task.completed }).eq('id', task.id);
    if (!error) setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  }

  async function addTask() {
    if (!newTask.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('daily_tasks').insert({
      user_id: user.id, name: newTask.trim(), bonus: 10,
      task_type: 'atk', completed: false,
      task_date: new Date().toISOString().split('T')[0],
    }).select().single();
    if (!error) { setTasks(prev => [...prev, data]); setNewTask(''); setAddingTask(false); }
  }

  async function deleteTask(id) {
    await supabase.from('daily_tasks').delete().eq('id', id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: colors.primary, fontFamily: fonts.mono, fontSize: '11px', letterSpacing: '4px' }}>LOADING...</span>
      </div>
    );
  }

  if (needsOnboarding) {
    return <Onboarding profile={profile} stats={stats} streak={streak} onComplete={() => { setNeedsOnboarding(false); fetchAll(); }} />;
  }

  const playerClass = getClassById(profile?.class);
  const playerSin = getSinById(streak?.vice);
  const ClassIcon = CLASS_ICONS[profile?.class] || CLASS_ICONS.warrior;
  const SinIcon = SIN_ICONS[streak?.vice];
  const completedCount = tasks.filter(t => t.completed).length;

  // Streak-based bonuses
  const streakCount = streak?.current_streak || 0;
  const persBoost = streakCount > 0 ? `+${Math.min(streakCount, 100)}%` : '—';

  return (
    <div style={{ fontFamily: fonts.body, paddingBottom: '1rem' }}>

      {/* TOP BAR */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 18px 4px',
      }}>
        <div>
          <div style={{
            fontSize: '16px', fontWeight: 700, letterSpacing: '4px',
            background: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>POWERCREEP</div>
          <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '2px', fontWeight: 500, marginTop: '1px' }}>
            YESTERDAY'S YOU IS OBSOLETE
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: colors.textDim, fontFamily: fonts.mono }}>
            Lv <span style={{ color: colors.gold, fontWeight: 600 }}>{stats?.level || 1}</span>
          </span>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${playerClass.color}, ${hexToRgba(playerClass.color, 0.6)})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: '#fff',
          }}>
            {(profile?.username || 'U').slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>

      {/* DAILY CHECK-IN CARD */}
      {showCheckin && !checkinDone && (
        <div style={{
          margin: '12px 18px', padding: '16px',
          background: hexToRgba(playerSin.color, 0.05),
          border: `1px solid ${hexToRgba(playerSin.color, 0.2)}`,
          borderRadius: '10px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '15px', color: colors.text, fontWeight: 600, marginBottom: '4px' }}>
            Did you give in to your vice?
          </div>
          <div style={{ fontSize: '11px', color: colors.textMid, marginBottom: '14px' }}>
            {playerSin.sin} — {playerSin.modern.toLowerCase()}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={() => handleDailyCheckin(false)} style={{
              padding: '10px 24px', background: hexToRgba(colors.success, 0.1),
              border: `1px solid ${hexToRgba(colors.success, 0.3)}`,
              color: colors.success, fontFamily: fonts.heading, fontSize: '13px',
              fontWeight: 600, cursor: 'pointer', borderRadius: '6px',
            }}>I resisted</button>
            <button onClick={() => handleDailyCheckin(true)} style={{
              padding: '10px 24px', background: hexToRgba(colors.hp, 0.1),
              border: `1px solid ${hexToRgba(colors.hp, 0.3)}`,
              color: colors.hp, fontFamily: fonts.heading, fontSize: '13px',
              fontWeight: 600, cursor: 'pointer', borderRadius: '6px',
            }}>I gave in</button>
          </div>
        </div>
      )}

      {/* AVATAR + STREAK HERO */}
      <div style={{
        textAlign: 'center', padding: '16px 18px 12px',
        background: `radial-gradient(ellipse at center, ${hexToRgba(playerSin.color, 0.06)} 0%, transparent 70%)`,
      }}>
        {/* Pixel avatar placeholder */}
        <div style={{
          width: '72px', height: '72px', margin: '0 auto 12px',
          background: colors.surface,
          border: `1px solid ${hexToRgba(playerClass.color, 0.25)}`,
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Placeholder pixel grid pattern until real pixel art is added */}
          <div style={{
            width: '48px', height: '56px',
            background: hexToRgba(playerClass.color, 0.06),
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ClassIcon size={32} color={hexToRgba(playerClass.color, 0.4)} />
          </div>
          {/* "AVATAR" tiny label */}
          <div style={{
            position: 'absolute', bottom: '2px', left: 0, right: 0,
            fontSize: '6px', color: colors.textDead, letterSpacing: '1.5px',
            fontFamily: fonts.mono, textAlign: 'center',
          }}>
            AVATAR
          </div>
        </div>

        {/* Streak number */}
        <div style={{
          fontSize: '56px', fontWeight: 700, lineHeight: 1,
          background: `linear-gradient(180deg, ${playerSin.color}, ${hexToRgba(playerSin.color, 0.5)})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {streak?.current_streak || 0}
        </div>
        <div style={{ fontSize: '10px', color: playerSin.color, letterSpacing: '3px', fontWeight: 600, marginTop: '4px', textTransform: 'uppercase' }}>
          DAY STREAK
        </div>
        <div style={{ fontSize: '10px', color: colors.textDim, marginTop: '6px', fontFamily: fonts.mono }}>
          Personal best: {streak?.longest_streak || 0} days
        </div>
        {/* Sin badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '5px 14px', borderRadius: '20px', marginTop: '10px',
          background: hexToRgba(playerSin.color, 0.08),
          border: `1px solid ${hexToRgba(playerSin.color, 0.2)}`,
        }}>
          {SinIcon && <SinIcon size={14} color={playerSin.color} />}
          <span style={{ fontSize: '11px', color: playerSin.color, fontWeight: 600 }}>
            Battling {playerSin.sin}
          </span>
        </div>
      </div>

      {/* CLASS BANNER */}
      <div style={{
        margin: '8px 18px 10px', padding: '10px 14px',
        background: hexToRgba(playerClass.color, 0.04),
        border: `1px solid ${hexToRgba(playerClass.color, 0.12)}`,
        borderRadius: '8px',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: hexToRgba(playerClass.color, 0.1),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ClassIcon size={20} color={playerClass.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', color: playerClass.color, fontWeight: 600 }}>{playerClass.name}</div>
          <div style={{ fontSize: '10px', color: colors.textDim, fontWeight: 500 }}>{playerClass.perk}</div>
        </div>
        <span style={{ fontSize: '10px', color: colors.textMid, fontFamily: fonts.mono }}>
          {playerClass.archetype.replace('The ', '')}
        </span>
      </div>

      {/* XP BAR */}
      <div style={{ margin: '0 18px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: colors.textDim, marginBottom: '5px', fontFamily: fonts.mono }}>
          <span>Level {stats?.level || 1}</span>
          <span style={{ color: colors.primary }}>{stats?.xp || 0} / 100 XP</span>
        </div>
        <div style={{ height: '6px', background: colors.surface2, borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.min((stats?.xp || 0), 100)}%`, height: '100%',
            background: `linear-gradient(90deg, ${colors.primaryDim}, ${colors.primary})`,
            borderRadius: '3px',
            boxShadow: `0 0 10px ${hexToRgba(colors.primary, 0.3)}`,
          }} />
        </div>
      </div>

      {/* ACTIVE BONUSES */}
      <div style={{ padding: '0 18px 10px' }}>
        <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', fontWeight: 600, marginBottom: '8px' }}>
          ACTIVE BONUSES
        </div>
        {[
          { label: `${playerSin.virtue} stat boost`, color: playerSin.color, value: persBoost },
          { label: `${playerClass.name} perk`, color: playerClass.color, value: playerClass.perk.split(' ')[0] },
          ...(streakCount >= 7 ? [{ label: '7-day streak milestone', color: colors.gold, value: '+50 gold' }] : []),
          ...(streakCount >= 30 ? [{ label: '30-day streak milestone', color: '#c084fc', value: '+200 gold' }] : []),
        ].map((bonus, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '7px 0',
            borderBottom: `1px solid ${colors.surface2}`,
          }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: bonus.color, flexShrink: 0,
              boxShadow: `0 0 6px ${hexToRgba(bonus.color, 0.4)}`,
            }} />
            <span style={{ flex: 1, fontSize: '12px', color: colors.textMid, fontWeight: 500 }}>{bonus.label}</span>
            <span style={{ fontSize: '12px', color: bonus.color, fontWeight: 600, fontFamily: fonts.mono }}>{bonus.value}</span>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: colors.border, margin: '4px 18px 12px' }} />

      {/* TASKS */}
      <div style={{ padding: '0 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', fontWeight: 600 }}>DAILY OBJECTIVES</span>
            {tasks.length > 0 && (
              <span style={{ fontSize: '9px', color: colors.primary, marginLeft: '8px', fontFamily: fonts.mono }}>
                {completedCount}/{tasks.length}
              </span>
            )}
          </div>
          <div onClick={() => setAddingTask(true)} style={{
            fontSize: '9px', color: colors.primary, letterSpacing: '1px', cursor: 'pointer',
            padding: '4px 10px', border: `1px solid ${colors.border}`, borderRadius: '4px',
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <IconPlus size={10} color={colors.primary} /> ADD
          </div>
        </div>

        {addingTask && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input autoFocus value={newTask} onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addTask(); if (e.key === 'Escape') setAddingTask(false); }}
              placeholder="task name..."
              style={{
                flex: 1, background: colors.surface2, border: `1px solid ${colors.borderAccent}`,
                color: colors.text, padding: '8px 10px', fontFamily: fonts.body,
                fontSize: '12px', fontWeight: 500, outline: 'none', borderRadius: '4px',
              }}
            />
            <button onClick={addTask} style={{
              background: colors.primary, color: '#080b14', border: 'none',
              padding: '8px 12px', fontFamily: fonts.heading, fontSize: '11px',
              cursor: 'pointer', borderRadius: '4px', fontWeight: 600,
            }}>ADD</button>
            <button onClick={() => setAddingTask(false)} style={{
              background: 'transparent', color: colors.textDim,
              border: `1px solid ${colors.border}`, padding: '8px 10px',
              fontFamily: fonts.heading, fontSize: '11px', cursor: 'pointer', borderRadius: '4px',
            }}>✕</button>
          </div>
        )}

        {tasks.length === 0 && !addingTask && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: colors.textDim, fontSize: '11px', letterSpacing: '2px', lineHeight: 2, fontWeight: 500 }}>
            NO OBJECTIVES SET.<br />
            <span style={{ color: colors.primary, cursor: 'pointer' }} onClick={() => setAddingTask(true)}>+ ADD YOUR FIRST TASK</span>
          </div>
        )}

        {tasks.map(task => (
          <div key={task.id} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 0', borderBottom: `1px solid ${colors.surface2}`,
          }}>
            <div onClick={() => toggleTask(task)} style={{
              width: '14px', height: '14px',
              border: `1px solid ${task.completed ? colors.primary : colors.textDead}`,
              borderRadius: '3px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: task.completed ? hexToRgba(colors.primary, 0.1) : 'transparent',
              cursor: 'pointer',
            }}>
              {task.completed && <div style={{ width: '6px', height: '6px', background: colors.primary, borderRadius: '1px' }} />}
            </div>
            <span style={{
              fontSize: '12px', color: task.completed ? colors.textDead : colors.text,
              flex: 1, textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 500,
            }}>{task.name}</span>
            <span style={{ fontSize: '9px', fontFamily: fonts.mono, fontWeight: 500, color: task.completed ? '#22c55e' : colors.textDim }}>
              {task.completed ? 'HIT' : '1 DMG'}
            </span>
            <span onClick={() => deleteTask(task.id)} style={{ fontSize: '11px', color: colors.textDim, cursor: 'pointer', padding: '0 4px' }}>✕</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;