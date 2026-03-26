import { useState } from 'react';
import { colors, fonts, SINS, hexToRgba } from '../styles/theme';
import { SIN_ICONS } from '../styles/icons';

function ChooseVice({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', fontFamily: fonts.body }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '12px', fontWeight: 500, letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '11px', color: colors.primary, letterSpacing: '4px', marginBottom: '8px', fontWeight: 600 }}>&gt; STEP 3 OF 4</div>
        <div style={{ fontSize: '24px', color: colors.text, letterSpacing: '2px', marginBottom: '4px', fontWeight: 700 }}>CHOOSE YOUR SIN</div>
        <div style={{ fontSize: '12px', color: colors.textDim, letterSpacing: '1px', marginBottom: '6px', fontWeight: 500 }}>THIS STAYS BETWEEN YOU AND THE APP.</div>
        <div style={{ fontSize: '11px', color: colors.textMid, letterSpacing: '0.5px', marginBottom: '24px', lineHeight: 1.6, fontWeight: 400 }}>
          Your vice is private. Only your streak count is visible to others. Every day clean multiplies your virtue stat.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {SINS.map(sin => {
            const isSelected = selected === sin.id;
            const IconComponent = SIN_ICONS[sin.id];

            return (
              <div
                key={sin.id}
                onClick={() => setSelected(sin.id)}
                style={{
                  background: isSelected ? hexToRgba(sin.color, 0.08) : colors.surface,
                  border: `1px solid ${isSelected ? hexToRgba(sin.color, 0.4) : colors.border}`,
                  borderRadius: '8px',
                  padding: '14px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    width: '6px', height: '6px', background: sin.color, borderRadius: '50%',
                    boxShadow: `0 0 6px ${hexToRgba(sin.color, 0.5)}`,
                  }} />
                )}

                <div style={{
                  width: '36px', height: '36px',
                  background: hexToRgba(sin.color, 0.08),
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {IconComponent && <IconComponent size={24} color={sin.color} />}
                </div>

                <div>
                  <div style={{
                    fontSize: '12px',
                    color: isSelected ? sin.color : colors.text,
                    letterSpacing: '2px',
                    fontWeight: 600,
                    marginBottom: '3px',
                  }}>
                    {sin.name}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: colors.textDim,
                    letterSpacing: '0.3px',
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}>
                    {sin.modern}
                  </div>
                </div>

                {/* Jewel badge */}
                <div style={{
                  fontSize: '8px',
                  color: hexToRgba(sin.color, 0.6),
                  letterSpacing: '1.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}>
                  {sin.jewel} — {sin.virtue}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => selected && onNext({ vice: selected })}
          style={{
            background: selected ? colors.primary : colors.surface,
            color: selected ? '#080b14' : colors.textDim,
            border: `1px solid ${selected ? colors.primary : colors.border}`,
            padding: '14px',
            fontFamily: fonts.heading,
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '3px',
            cursor: selected ? 'pointer' : 'not-allowed',
            width: '100%',
            borderRadius: '6px',
            transition: 'all 0.15s',
            textTransform: 'uppercase',
          }}
        >
          {selected ? `COMMIT → ${SINS.find(v => v.id === selected)?.name}` : 'SELECT YOUR SIN'}
        </button>
      </div>
    </div>
  );
}

export default ChooseVice;