import { fonts, colors } from '../styles/theme';

function StatBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: fonts.heading,
          fontSize: '11px',
          fontWeight: 600,
          color: color,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '10px',
          color: colors.textDim,
        }}>
          {value}/{max}
        </span>
      </div>
      <div style={{
        height: '4px',
        background: colors.surface2,
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          borderRadius: '2px',
          transition: 'width 0.4s ease',
          boxShadow: `0 0 8px ${color}33`,
        }} />
      </div>
    </div>
  );
}

export default StatBar;