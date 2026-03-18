import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Welcome from './auth/Welcome';
import SignUp from './auth/SignUp';
import ChooseClass from './auth/ChooseClass';
import ChooseVice from './auth/ChooseVice';
import NameCharacter from './auth/NameCharacter';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Boss from './screens/Boss';
import Weapons from './screens/Weapons';
import Journal from './screens/Journal';
import BottomNav from './components/BottomNav';
import { colors } from './styles/theme';
import Login from './auth/Login';

function App() {
  const [session, setSession] = useState(null);
  const [authStep, setAuthStep] = useState('welcome');
  const [signupData, setSignupData] = useState({});
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleSignupNext(data) {
    setSignupData(prev => ({ ...prev, ...data }));
    if (authStep === 'signup') setAuthStep('chooseClass');
    else if (authStep === 'chooseClass') setAuthStep('chooseVice');
    else if (authStep === 'chooseVice') setAuthStep('nameCharacter');
  }

  function handleComplete() {
    setAuthStep('welcome');
  }

  const screens = {
    home: <Home />,
    boss: <Boss />,
    weapons: <Weapons />,
    journal: <Journal />,
    profile: <Profile />,
  };

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: colors.acid, fontFamily: 'monospace', fontSize: '12px', letterSpacing: '4px' }}>LOADING...</span>
      </div>
    );
  }

  if (!session) {
    if (authStep === 'welcome') return <Welcome onSignUp={() => setAuthStep('signup')} onLogin={() => setAuthStep('login')} />;
    if (authStep === 'login') return <Login onBack={() => setAuthStep('welcome')} onSuccess={() => setAuthStep('welcome')} />;
    if (authStep === 'signup') return <SignUp onNext={handleSignupNext} onBack={() => setAuthStep('welcome')} />;
    if (authStep === 'chooseClass') return <ChooseClass onNext={handleSignupNext} onBack={() => setAuthStep('signup')} />;
    if (authStep === 'chooseVice') return <ChooseVice onNext={handleSignupNext} onBack={() => setAuthStep('chooseClass')} />;
    if (authStep === 'nameCharacter') return <NameCharacter onComplete={handleComplete} signupData={signupData} onBack={() => setAuthStep('chooseVice')} />;
  }

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', maxWidth: '390px', margin: '0 auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '60px' }}>
        {screens[activeTab]}
      </div>
      <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '390px' }}>
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;