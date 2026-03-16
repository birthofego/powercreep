function StatBar({ label, value, max, color }) {
  const percentage = (value / max) * 100;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ color: color, fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '2px' }}>
          {label}
        </span>
        <span style={{ color: '#4a4845', fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {value}/{max}
        </span>
      </div>
      <div style={{ background: '#1a1a1a', height: '8px' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: color }} />
      </div>
    </div>
  );
}

export default StatBar;