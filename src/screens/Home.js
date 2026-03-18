import { useState } from 'react';
import { colors, fonts } from '../styles/theme';
import StatBar from '../components/StatBar';

const TASKS = [
  { id: 1, name: 'Hit the gym', bonus: 55, type: 'atk' },
  { id: 2, name: 'Program 1 hour', bonus: 40, type: 'atk' },
  { id: 3, name: '150g protein', bonus: 35, type: 'atk' },
  { id: 4, name: 'Walk the dog', bonus: 25, type: 'atk' },
  { id: 5, name: 'Journal entry', bonus: 50, type: 'int' },
];

function Home() {
  const [tasks, setTasks] = useState(TASKS.map(t => ({ ...t, done: false })));
  const [stats, setStats] = useState({ hp: 100, int: 0, per: 0 });

  function toggleTask(id) {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    const completedAtk = updated.filter(t => t.done && t.type === 'atk').reduce((s, t) => s + t.bonus, 0);
    const completedInt = updated.filter(t => t.done && t.type === 'int').reduce((s, t) => s + t.bonus, 0);
    setStats(prev => ({
      hp: prev.hp,
      int: Math.min(completedInt * 0.5, 100),
      per: prev.per,
    }));
  }

  const baseAtk = 42;
  const taskAtkBonus = tasks.filter(t => t.done && t.type === 'atk').reduce((s, t) => s + t.bonus, 0);
  const totalAtk = baseAtk + taskAtkBonus;

  return (
    <div style={{ fontFamily: fonts.mono, paddingBottom: '1rem' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px 8px' }}>
        <span style={{ color: colors.acid, fontSize: '14px', letterSpacing: '4px', fontWeight: 500 }}>POWERCREEP</span>
        <span style={{ color: colors.textDim, fontSize: '10px', letterSpacing: '1px' }}>LVL 1</span>
      </div>

      {/* AVATAR ROW */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '0 18px 14px' }}>
        <div style={{ width: '64px', height: '80px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '4px', flexShrink: 0 }}>
          <div style={{ width: '40px', height: '56px', background: colors.surface2, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '22px' }}>⚔️</span>
          </div>
          <span style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginTop: '3px' }}>WARRIOR</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', color: colors.text, fontWeight: 500, marginBottom: '2px' }}>birthofego</div>
          <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '8px' }}>WARRIOR CLASS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: colors.textDim, marginBottom: '3px' }}>
            <span>XP</span><span>0 / 100</span>
          </div>
          <div style={{ height: '3px', background: colors.surface2 }}>
            <div style={{ width: '3%', height: '100%', background: colors.acid }} />
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: colors.border, margin: '0 18px 12px' }} />

      {/* STATS */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '2px', marginBottom: '8px' }}>STATS</div>
        <StatBar label="HP  HEALTH" value={stats.hp} max={100} color={colors.hp} />
        <StatBar label="INT  INTELLIGENCE" value={Math.round(stats.int)} max={100} color={colors.int} />
        <StatBar label="PER  PERSISTENCE" value={stats.per} max={100} color={colors.per} />
      </div>

      {/* VICE */}
      <div style={{ margin: '0 18px 12px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '6px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '2px', marginBottom: '3px' }}>ACTIVE VICE</div>
          <div style={{ fontSize: '12px', color: colors.text, fontWeight: 500 }}>Nicotine</div>
          <div style={{ fontSize: '8px', color: colors.acid, marginTop: '2px' }}>PER × 1.00</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', color: colors.acid, lineHeight: 1 }}>0</div>
          <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginTop: '2px' }}>DAYS CLEAN</div>
        </div>
      </div>

      {/* ATK */}
      <div style={{ margin: '0 18px 12px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '6px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '2px', marginBottom: '3px' }}>ATTACK POWER</div>
          <div style={{ fontSize: '24px', color: colors.hp, lineHeight: 1 }}>{totalAtk}</div>
          <div style={{ fontSize: '8px', color: colors.textDim, marginTop: '2px' }}>base + task bonus</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '8px', padding: '2px 6px', border: `1px solid #2e2a10`, color: colors.gold, borderRadius: '2px' }}>IRON DAGGER [CMN]</div>
          <div style={{ fontSize: '8px', padding: '2px 6px', border: `1px solid #2e1810`, color: colors.hp, borderRadius: '2px' }}>CRIT 8%</div>
        </div>
      </div>

      <div style={{ height: '1px', background: colors.border, margin: '0 18px 12px' }} />

      {/* TASKS */}
      <div style={{ padding: '0 18px' }}>
        <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '2px', marginBottom: '8px' }}>TODAY'S OBJECTIVES</div>
        {tasks.map(task => (
          <div key={task.id} onClick={() => toggleTask(task.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${colors.surface2}`, cursor: 'pointer' }}>
            <div style={{ width: '13px', height: '13px', border: `1px solid ${task.done ? colors.acid : '#333'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: task.done ? 'rgba(184,255,0,0.08)' : 'transparent' }}>
              {task.done && <div style={{ width: '5px', height: '5px', background: colors.acid }} />}
            </div>
            <span style={{ fontSize: '10px', color: task.done ? colors.textDead : colors.text, flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            <span style={{ fontSize: '8px', color: task.type === 'int' ? colors.int : colors.hp }}>
              +{task.bonus} {task.type}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;