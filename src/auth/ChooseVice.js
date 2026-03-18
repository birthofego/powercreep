import { useState } from 'react';
import { colors, fonts } from '../styles/theme';

const VICES = [
  { id: 'nicotine', name: 'NICOTINE', desc: 'Cigarettes, vapes, pouches.', symbol: '🚬', color: '#ff9f43' },
  { id: 'alcohol', name: 'ALCOHOL', desc: 'Drinking, binge sessions.', symbol: '🍺', color: '#ffd700' },
  { id: 'drugs', name: 'DRUGS', desc: 'Any substance abuse.', symbol: '💊', color: '#ff4820' },
  { id: 'gambling', name: 'GAMBLING', desc: 'Betting, sports books, casinos.', symbol: '🎲', color: '#c084fc' },
  { id: 'pleasure', name: 'PLEASURE', desc: 'Adult content, compulsive behavior.', symbol: '🔥', color: '#ff4820' },
  { id: 'sugar', name: 'SUGAR', desc: 'Junk food, binge eating.', symbol: '🍬', color: '#4ade80' },
  { id: 'doomscrolling', name: 'DOOMSCROLLING', desc: 'Mindless phone use, social media.', symbol: '📱', color: '#00d4c8' },
  { id: 'caffeine', name: 'CAFFEINE', desc: 'Coffee, energy drinks, dependency.', symbol: '☕', color: '#92400e' },
];

function ChooseVice({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: fonts.mono }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '10px', letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '9px', color: colors.acid, letterSpacing: '4px', marginBottom: '8px' }}>&gt; STEP 3 OF 4</div>
        <div style={{ fontSize: '22px', color: colors.text, letterSpacing: '2px', marginBottom: '4px' }}>NAME YOUR VICE</div>
        <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '1px', marginBottom: '6px' }}>THIS STAYS BETWEEN YOU AND THE APP.</div>
        <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '28px', lineHeight: 1.6 }}>
          Your vice is private. Only your streak count is visible to others. Every day clean multiplies your Persistence gain.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
          {VICES.map(vice => (
            <div
              key={vice.id}
              onClick={() => setSelected(vice.id)}
              style={{
                background: selected === vice.id ? `rgba(${
                  vice.color === '#ff4820' ? '255,72,32' :
                  vice.color === '#ffd700' ? '255,215,0' :
                  vice.color === '#ff9f43' ? '255,159,67' :
                  vice.color === '#c084fc' ? '192,132,252' :
                  vice.color === '#4ade80' ? '74,222,128' :
                  vice.color === '#00d4c8' ? '0,212,200' :
                  vice.color === '#92400e' ? '146,64,14' : '255,72,32'
                },0.1)` : colors.surface,
                border: `1px solid ${selected === vice.id ? vice.color : colors.border}`,
                borderRadius: '6px',
                padding: '14px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
              }}
            >
              {selected === vice.id && (
                <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', background: vice.color, borderRadius: '50%' }} />
              )}
              <div style={{ fontSize: '22px', lineHeight: 1 }}>{vice.symbol}</div>
              <div>
                <div style={{ fontSize: '10px', color: selected === vice.id ? vice.color : colors.text, letterSpacing: '2px', fontWeight: 500, marginBottom: '3px' }}>{vice.name}</div>
                <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '0.5px', lineHeight: 1.4 }}>{vice.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => selected && onNext({ vice: selected })}
          style={{
            background: selected ? colors.acid : colors.surface,
            color: selected ? '#0d0d0f' : colors.textDim,
            border: `1px solid ${selected ? colors.acid : colors.border}`,
            padding: '14px',
            fontFamily: fonts.mono,
            fontSize: '12px',
            letterSpacing: '3px',
            cursor: selected ? 'pointer' : 'not-allowed',
            width: '100%',
            transition: 'all 0.15s',
          }}
        >
          {selected ? `COMMIT → ${VICES.find(v => v.id === selected)?.name}` : 'SELECT YOUR VICE'}
        </button>
      </div>
    </div>
  );
}

export default ChooseVice;