import { useState } from 'react';
import { colors, fonts, CLASSES, hexToRgba } from '../styles/theme';
import { CLASS_ICONS } from '../styles/icons';

function ChooseClass({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', fontFamily: fonts.body }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '12px', fontWeight: 500, letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '11px', color: colors.primary, letterSpacing: '4px', marginBottom: '8px', fontWeight: 600 }}>&gt; STEP 2 OF 4</div>
        <div style={{ fontSize: '24px', color: colors.text, letterSpacing: '2px', marginBottom: '4px', fontWeight: 700 }}>CHOOSE YOUR CLASS</div>
        <div style={{ fontSize: '12px', color: colors.textDim, letterSpacing: '1px', marginBottom: '28px', fontWeight: 500 }}>THIS DEFINES HOW YOU FIGHT</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {CLASSES.map(cls => {
            const isSelected = selected === cls.id;
            const IconComponent = CLASS_ICONS[cls.id];

            return (
              <div
                key={cls.id}
                onClick={() => setSelected(cls.id)}
                style={{
                  background: isSelected ? hexToRgba(cls.color, 0.06) : colors.surface,
                  border: `1px solid ${isSelected ? hexToRgba(cls.color, 0.4) : colors.border}`,
                  borderRadius: '8px',
                  padding: '14px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s',
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    width: '8px', height: '8px', background: cls.color, borderRadius: '50%',
                    boxShadow: `0 0 8px ${hexToRgba(cls.color, 0.5)}`,
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{
                    width: '46px', height: '46px',
                    background: hexToRgba(cls.color, 0.08),
                    border: `1px solid ${isSelected ? hexToRgba(cls.color, 0.3) : colors.border}`,
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {IconComponent && <IconComponent size={28} color={cls.color} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '15px',
                      color: isSelected ? cls.color : colors.text,
                      letterSpacing: '3px',
                      fontWeight: 600,
                    }}>
                      {cls.name}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: isSelected ? hexToRgba(cls.color, 0.7) : colors.textDim,
                      letterSpacing: '1.5px',
                      marginTop: '1px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}>
                      {cls.archetype}
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '11px',
                  color: colors.textMid,
                  lineHeight: 1.5,
                  marginBottom: '10px',
                  fontWeight: 400,
                }}>
                  {cls.desc}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, background: colors.surface2, padding: '6px 10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px', fontWeight: 600 }}>HP</div>
                    <div style={{ fontSize: '16px', color: colors.hp, fontWeight: 600 }}>{cls.hp}</div>
                  </div>
                  <div style={{ flex: 1, background: colors.surface2, padding: '6px 10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px', fontWeight: 600 }}>ATK</div>
                    <div style={{ fontSize: '16px', color: colors.gold, fontWeight: 600 }}>{cls.atk}</div>
                  </div>
                  <div style={{ flex: 2, background: colors.surface2, padding: '6px 10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px', fontWeight: 600 }}>PERK</div>
                    <div style={{ fontSize: '9px', color: cls.color, letterSpacing: '0.5px', lineHeight: 1.4, fontWeight: 500 }}>
                      {cls.perk}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => selected && onNext({ class: selected })}
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
          {selected ? `PLAY AS ${CLASSES.find(c => c.id === selected)?.name} →` : 'SELECT A CLASS'}
        </button>
      </div>
    </div>
  );
}

export default ChooseClass;