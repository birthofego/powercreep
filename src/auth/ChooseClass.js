import { useState } from 'react';
import { colors, fonts } from '../styles/theme';

const CLASSES = [
  { id: 'warrior', name: 'WARRIOR', symbol: '⚔️', hp: 10, atk: 5, passive: 'Balanced fighter. No weakness, no ceiling.', color: '#ff4820' },
  { id: 'guardian', name: 'GUARDIAN', symbol: '🛡️', hp: 15, atk: 5, passive: 'High durability. Takes reduced damage from bosses.', color: '#00d4c8' },
  { id: 'cleric', name: 'CLERIC', symbol: '✨', hp: 10, atk: 3, passive: 'Completing tasks heals HP instead of just preventing decay.', color: '#c084fc' },
];

function ChooseClass({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', fontFamily: fonts.mono }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '10px', letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '9px', color: colors.acid, letterSpacing: '4px', marginBottom: '8px' }}>&gt; STEP 2 OF 4</div>
        <div style={{ fontSize: '22px', color: colors.text, letterSpacing: '2px', marginBottom: '4px' }}>CHOOSE YOUR CLASS</div>
        <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '1px', marginBottom: '32px' }}>THIS DEFINES HOW YOU FIGHT</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {CLASSES.map(cls => (
            <div key={cls.id} onClick={() => setSelected(cls.id)} style={{ background: selected === cls.id ? `rgba(${cls.id === 'warrior' ? '255,72,32' : cls.id === 'guardian' ? '0,212,200' : '192,132,252'},0.08)` : colors.surface, border: `1px solid ${selected === cls.id ? cls.color : colors.border}`, borderRadius: '6px', padding: '16px', cursor: 'pointer', position: 'relative' }}>
              {selected === cls.id && <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', background: cls.color, borderRadius: '50%' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', background: colors.surface2, border: `1px solid ${selected === cls.id ? cls.color : colors.border}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  {cls.symbol}
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: selected === cls.id ? cls.color : colors.text, letterSpacing: '3px', fontWeight: 500 }}>{cls.name}</div>
                  <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginTop: '2px' }}>{cls.passive}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, background: colors.surface2, padding: '6px 10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px' }}>HP</div>
                  <div style={{ fontSize: '16px', color: colors.hp, fontWeight: 500 }}>{cls.hp}</div>
                </div>
                <div style={{ flex: 1, background: colors.surface2, padding: '6px 10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px' }}>ATK</div>
                  <div style={{ fontSize: '16px', color: '#ffd700', fontWeight: 500 }}>{cls.atk}</div>
                </div>
                <div style={{ flex: 2, background: colors.surface2, padding: '6px 10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px' }}>PASSIVE</div>
                  <div style={{ fontSize: '8px', color: cls.color, letterSpacing: '0.5px', lineHeight: 1.4 }}>
                    {cls.id === 'warrior' ? 'BALANCED' : cls.id === 'guardian' ? 'TANK' : 'HEALER'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => selected && onNext({ class: selected })} style={{ background: selected ? colors.acid : colors.surface, color: selected ? '#0d0d0f' : colors.textDim, border: `1px solid ${selected ? colors.acid : colors.border}`, padding: '14px', fontFamily: fonts.mono, fontSize: '12px', letterSpacing: '3px', cursor: selected ? 'pointer' : 'not-allowed', width: '100%' }}>
          {selected ? `PLAY AS ${CLASSES.find(c => c.id === selected)?.name} →` : 'SELECT A CLASS'}
        </button>
      </div>
    </div>
  );
}

export default ChooseClass;