import { fonts } from '../styles/theme';

function StatBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: '7px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: '9px', color, letterSpacing: '1px' }}>{label}</span>
        <span style={{ fontFamily: fonts.mono, fontSize: '9px', color: '#444' }}>{value}/{max}</span>
      </div>
      <div style={{ height: '4px', background: '#1a1a1e' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color }} />
      </div>
    </div>
  );
}

export default StatBar;