import { useState } from 'react';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Boss from './screens/Boss';
import Weapons from './screens/Weapons';
import Journal from './screens/Journal';
import BottomNav from './components/BottomNav';
import { colors } from './styles/theme';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const screens = {
    home: <Home />,
    boss: <Boss />,
    weapons: <Weapons />,
    journal: <Journal />,
    profile: <Profile />,
  };

  return (
    <div style={{
      background: colors.bg,
      minHeight: '100vh',
      maxWidth: '390px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
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