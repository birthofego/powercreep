import { useState } from 'react';
import { colors, fonts } from '../styles/theme';
import { supabase } from '../supabase';

function SignUp({ onNext, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setError('');
    if (!email || !password) { setError('All fields required.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    onNext({ email });
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

        {/* BACK */}
        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '10px', letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '9px', color: colors.acid, letterSpacing: '4px', marginBottom: '8px' }}>&gt; STEP 1 OF 4</div>
        <div style={{ fontSize: '22px', color: colors.text, letterSpacing: '2px', marginBottom: '4px' }}>CREATE ACCOUNT</div>
        <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '1px', marginBottom: '32px' }}>YOUR JOURNEY STARTS HERE</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', marginBottom: '6px' }}>EMAIL <span style={{ color: colors.textDead }}>// PRIVATE, USED FOR LOGIN ONLY</span></div>
            <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', marginBottom: '6px' }}>PASSWORD</div>
            <input style={inputStyle} type="password" placeholder="min 6 characters" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignUp()} />
          </div>
        </div>

        {error && <div style={{ fontSize: '10px', color: colors.hp, marginBottom: '16px', letterSpacing: '1px' }}>{error}</div>}

        <button onClick={handleSignUp} disabled={loading} style={{ background: colors.acid, color: '#0d0d0f', border: 'none', padding: '14px', fontFamily: fonts.mono, fontSize: '12px', letterSpacing: '3px', cursor: 'pointer', width: '100%', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'CREATING...' : 'CONTINUE →'}
        </button>

        <div onClick={onBack} style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px', color: colors.textDim, letterSpacing: '1px', cursor: 'pointer' }}>
          already have an account? log in
        </div>
      </div>
    </div>
  );
}

export default SignUp;