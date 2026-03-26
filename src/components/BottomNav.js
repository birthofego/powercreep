import { colors, fonts } from '../styles/theme';
import { NAV_ICONS } from '../styles/icons';

const tabs = [
  { id: 'home', label: 'HOME' },
  { id: 'boss', label: 'BOSS' },
  { id: 'weapons', label: 'ARMORY' },
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
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const IconComponent = NAV_ICONS[tab.id];
        const iconColor = isActive ? colors.primary : colors.textDim;

        return (
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
              position: 'relative',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: '-1px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '2px',
                background: colors.primary,
                borderRadius: '0 0 2px 2px',
              }} />
            )}

            {IconComponent && <IconComponent size={18} color={iconColor} />}

            <span style={{
              fontFamily: fonts.heading,
              fontSize: '9px',
              fontWeight: isActive ? 600 : 500,
              letterSpacing: '1.5px',
              color: isActive ? colors.primary : colors.textDim,
            }}>
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default BottomNav;