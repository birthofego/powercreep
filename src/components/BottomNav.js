import { colors, fonts } from '../styles/theme';

const tabs = [
  { id: 'home', label: 'HOME' },
  { id: 'boss', label: 'BOSS' },
  { id: 'weapons', label: 'WEAPONS' },
  { id: 'journal', label: 'JOURNAL' },
  { id: 'profile', label: 'PROFILE' },
];

function BottomNav({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      borderTop: `1px solid ${colors.border}`,
      background: colors.bg,
    }}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 0 12px',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '8px',
            letterSpacing: '1px',
            color: active === tab.id ? colors.acid : colors.textDim,
          }}>
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BottomNav;