import React, { useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('signup');
  const [userEmail, setUserEmail] = useState('');

  const loginSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => setIsLoggedIn(false);



  if (isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <button onClick={logout}>logout</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      {view === 'signup' && <SignupForm onSwitchToLogin={() => setView('login')} />}
      {view === 'login' && <LoginForm onLoginSuccess={loginSuccess} onSwitchToSignup={() => setView('signup')} />}
    </div>
  );
};


export default App;
