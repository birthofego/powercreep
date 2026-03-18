import { useState } from 'react';
import { colors, fonts } from '../styles/theme';
import { supabase } from '../supabase';

const CLASS_STATS = {
  warrior: { hp: 10, atk: 5 },
  guardian: { hp: 15, atk: 5 },
  cleric: { hp: 10, atk: 3 },
};

function NameCharacter({ onComplete, onBack, signupData }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const discriminator = useState(() => Math.floor(1000 + Math.random() * 9000))[0];

  async function handleComplete() {
    setError('');
    if (!username.trim()) { setError('Your character needs a name.'); return; }
    if (username.trim().length < 3) { setError('Name must be at least 3 characters.'); return; }
    if (username.trim().length > 20) { setError('Name must be under 20 characters.'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) { setError('Letters, numbers and underscores only.'); return; }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('Session expired. Please sign up again.'); setLoading(false); return; }

    const stats = CLASS_STATS[signupData.class];

    const { error: profileError } = await supabase
      .from('users_profile')
      .insert({
        id: user.id,
        username: username.trim(),
        discriminator,
        class: signupData.class,
      });

    if (profileError) { setError(profileError.message); setLoading(false); return; }

    const { error: statsError } = await supabase
      .from('player_stats')
      .insert({
        user_id: user.id,
        health: stats.hp,
        base_atk: stats.atk,
        intelligence: 0,
        persistence: 0,
        level: 1,
        xp: 0,
      });

    if (statsError) { setError(statsError.message); setLoading(false); return; }

    const { error: streakError } = await supabase
      .from('streaks')
      .insert({
        user_id: user.id,
        vice: signupData.vice,
        current_streak: 0,
        longest_streak: 0,
      });

    if (streakError) { setError(streakError.message); setLoading(false); return; }

    setLoading(false);
    onComplete();
  }

  const selectedClass = signupData?.class || 'warrior';
  const stats = CLASS_STATS[selectedClass];

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', fontFamily: fonts.mono }}>
      <div style={{ width: '100%', maxWidth: '300px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '10px', letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '9px', color: colors.acid, letterSpacing: '4px', marginBottom: '8px' }}>&gt; STEP 4 OF 4</div>
        <div style={{ fontSize: '22px', color: colors.text, letterSpacing: '2px', marginBottom: '4px' }}>NAME YOUR CHARACTER</div>
        <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '1px', marginBottom: '32px' }}>THIS IS HOW THE WORLD KNOWS YOU</div>

        <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '6px', padding: '12px 14px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '2px', marginBottom: '3px' }}>CLASS</div>
            <div style={{ fontSize: '13px', color: colors.acid, letterSpacing: '2px' }}>{selectedClass.toUpperCase()}</div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px' }}>HP</div>
              <div style={{ fontSize: '16px', color: colors.hp }}>{stats.hp}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '8px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px' }}>ATK</div>
              <div style={{ fontSize: '16px', color: '#ffd700' }}>{stats.atk}</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', marginBottom: '6px' }}>CHARACTER NAME</div>
          <input
            style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '12px 14px', fontFamily: fonts.mono, fontSize: '14px', width: '100%', outline: 'none', letterSpacing: '2px' }}
            placeholder="e.g. birthofego"
            value={username}
            maxLength={20}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleComplete()}
          />
        </div>

        {username.trim().length >= 3 && (
          <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '1px', marginBottom: '20px' }}>
            your tag: <span style={{ color: colors.acid }}>{username}#{discriminator}</span>
          </div>
        )}

        {error && <div style={{ fontSize: '10px', color: colors.hp, marginBottom: '16px', letterSpacing: '1px' }}>{error}</div>}

        <button
          onClick={handleComplete}
          disabled={loading}
          style={{ background: username ? colors.acid : colors.surface, color: username ? '#0d0d0f' : colors.textDim, border: `1px solid ${username ? colors.acid : colors.border}`, padding: '14px', fontFamily: fonts.mono, fontSize: '12px', letterSpacing: '3px', cursor: username ? 'pointer' : 'not-allowed', width: '100%', opacity: loading ? 0.6 : 1, transition: 'all 0.15s' }}
        >
          {loading ? 'CREATING CHARACTER...' : 'BEGIN YOUR JOURNEY →'}
        </button>
      </div>
    </div>
  );
}

export default NameCharacter;