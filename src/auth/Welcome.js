import { colors, fonts } from '../styles/theme';

function Welcome({ onSignUp, onLogin }) {
  return (
    <div style={{
      background: colors.bg,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
      fontFamily: fonts.mono,
    }}>
      <div style={{ marginBottom: '8px', fontSize: '11px', color: colors.textDim, letterSpacing: '4px' }}>
        &gt; SELF-UPGRADE PROTOCOL
      </div>
      <div style={{ fontSize: '42px', color: colors.acid, letterSpacing: '6px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
        POWERCREEP
      </div>
      <div style={{ fontSize: '11px', color: colors.textDim, letterSpacing: '2px', marginBottom: '64px', textAlign: 'center', lineHeight: 1.6 }}>
        OUTGROW YESTERDAY.
      </div>

      <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onSignUp}
          style={{
            background: colors.acid,
            color: '#0d0d0f',
            border: 'none',
            padding: '14px',
            fontFamily: fonts.mono,
            fontSize: '12px',
            letterSpacing: '3px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          CREATE CHARACTER
        </button>
        <button
          onClick={onLogin}
          style={{
            background: 'transparent',
            color: colors.textDim,
            border: `1px solid ${colors.border}`,
            padding: '14px',
            fontFamily: fonts.mono,
            fontSize: '12px',
            letterSpacing: '3px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          LOG IN
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '32px', fontSize: '9px', color: colors.textDead, letterSpacing: '2px' }}>
        V1.0.0 // POWERCREEP
      </div>
    </div>
  );
}

export default Welcome;