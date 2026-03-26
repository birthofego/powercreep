import { useState } from 'react';
import { colors, fonts, getClassById, hexToRgba } from '../styles/theme';
import { supabase } from '../supabase';
import { CLASS_ICONS } from '../styles/icons';

function NameCharacter({ onComplete, onBack, signupData }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const discriminator = useState(() => Math.floor(1000 + Math.random() * 9000))[0];

  const selectedClass = getClassById(signupData?.class);
  const ClassIcon = CLASS_ICONS[signupData?.class] || CLASS_ICONS.warrior;

  async function handleComplete() {
    setError('');
    if (!username.trim()) { setError('Your character needs a name.'); return; }
    if (username.trim().length < 3) { setError('Name must be at least 3 characters.'); return; }
    if (username.trim().length > 20) { setError('Name must be under 20 characters.'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) { setError('Letters, numbers and underscores only.'); return; }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('Session expired. Please sign up again.'); setLoading(false); return; }

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
        health: 100,
        base_atk: selectedClass.atk,
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
        last_check_in: null,
      });

    if (streakError) { setError(streakError.message); setLoading(false); return; }

    setLoading(false);
    onComplete();
  }

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', fontFamily: fonts.body }}>
      <div style={{ width: '100%', maxWidth: '300px' }}>

        <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', cursor: 'pointer', color: colors.textDim, fontSize: '12px', fontWeight: 500, letterSpacing: '2px' }}>
          ← BACK
        </div>

        <div style={{ fontSize: '11px', color: colors.primary, letterSpacing: '4px', marginBottom: '8px', fontWeight: 600 }}>&gt; STEP 4 OF 4</div>
        <div style={{ fontSize: '24px', color: colors.text, letterSpacing: '2px', marginBottom: '4px', fontWeight: 700 }}>NAME YOUR CHARACTER</div>
        <div style={{ fontSize: '12px', color: colors.textDim, letterSpacing: '1px', marginBottom: '32px', fontWeight: 500 }}>THIS IS HOW THE WORLD KNOWS YOU</div>

        <div style={{
          background: hexToRgba(selectedClass.color, 0.05),
          border: `1px solid ${hexToRgba(selectedClass.color, 0.2)}`,
          borderRadius: '8px', padding: '12px 14px', marginBottom: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ClassIcon size={24} color={selectedClass.color} />
            <div>
              <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '2px', marginBottom: '3px', fontWeight: 600 }}>CLASS</div>
              <div style={{ fontSize: '14px', color: selectedClass.color, letterSpacing: '2px', fontWeight: 600 }}>{selectedClass.name}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px', fontWeight: 600 }}>HP</div>
              <div style={{ fontSize: '16px', color: colors.hp, fontWeight: 600 }}>100</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: colors.textDim, letterSpacing: '1px', marginBottom: '2px', fontWeight: 600 }}>ATK</div>
              <div style={{ fontSize: '16px', color: colors.gold, fontWeight: 600 }}>{selectedClass.atk}</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '10px', color: colors.textDim, letterSpacing: '2px', marginBottom: '6px', fontWeight: 600 }}>CHARACTER NAME</div>
          <input
            style={{
              background: colors.surface2, border: `1px solid ${colors.border}`,
              color: colors.text, padding: '12px 14px',
              fontFamily: fonts.body, fontSize: '15px', fontWeight: 600,
              width: '100%', outline: 'none', letterSpacing: '2px', borderRadius: '6px',
            }}
            placeholder="e.g. birthofego"
            value={username} maxLength={20}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleComplete()}
          />
        </div>

        {username.trim().length >= 3 && (
          <div style={{ fontSize: '11px', color: colors.textMid, letterSpacing: '1px', marginBottom: '20px' }}>
            your tag: <span style={{ color: colors.primary, fontFamily: fonts.mono }}>{username}#{discriminator}</span>
          </div>
        )}

        {error && <div style={{ fontSize: '11px', color: colors.hp, marginBottom: '16px', letterSpacing: '1px' }}>{error}</div>}

        <button
          onClick={handleComplete} disabled={loading}
          style={{
            background: username ? colors.primary : colors.surface,
            color: username ? '#080b14' : colors.textDim,
            border: `1px solid ${username ? colors.primary : colors.border}`,
            padding: '14px', fontFamily: fonts.heading, fontSize: '13px', fontWeight: 600,
            letterSpacing: '3px', cursor: username ? 'pointer' : 'not-allowed',
            width: '100%', opacity: loading ? 0.6 : 1, borderRadius: '6px',
            transition: 'all 0.15s', textTransform: 'uppercase',
          }}
        >
          {loading ? 'CREATING CHARACTER...' : 'BEGIN YOUR JOURNEY →'}
        </button>
      </div>
    </div>
  );
}

export default NameCharacter;