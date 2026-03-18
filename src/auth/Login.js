import { useState } from 'react';
import { colors, fonts } from '../styles/theme';
import { supabase } from '../supabase';

function Login({ onBack, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');
    if (!email || !password) { setError('All fields required.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    onSuccess();
  }

  const inputStyle = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    color: colors.text,
    padding: '12px 14px',
    fontFamily: fonts.mono,
    fontSize: '12px',
    width: '100%',
    outline: 'none',
    letterSpacing: '1px',
  };

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', fontFamily: fonts.mono }}>
      <div style={{ width: '100%', maxWidth: '300px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '10px', letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '22px', color: colors.text, letterSpacing: '2px', marginBottom: '4px' }}>WELCOME BACK</div>
        <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '1px', marginBottom: '32px' }}>CONTINUE YOUR JOURNEY</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', marginBottom: '6px' }}>EMAIL</div>
            <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', marginBottom: '6px' }}>PASSWORD</div>
            <input style={inputStyle} type="password" placeholder="your password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
        </div>

        {error && <div style={{ fontSize: '10px', color: colors.hp, marginBottom: '16px', letterSpacing: '1px' }}>{error}</div>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ background: colors.acid, color: '#0d0d0f', border: 'none', padding: '14px', fontFamily: fonts.mono, fontSize: '12px', letterSpacing: '3px', cursor: 'pointer', width: '100%', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'LOGGING IN...' : 'LOG IN →'}
        </button>
      </div>
    </div>
  );
}

export default Login;