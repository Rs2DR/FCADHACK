import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import LoginPage from './Pages/AuthPages/LoginPage';
import RegistrationPage from './Pages/AuthPages/RegistrationPage';

import AdminPage from './Pages/AdminPage';
import RegexPage from './Pages/AdminPages/RegexPage';
import MessagesPage from './Pages/AdminPages/MessagesPage';
import ServesPage from './Pages/AdminPages/ServerPage';
import SettingsPage from './Pages/AdminPages/SettingsPage';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth/login" element={<LoginPage setIsLogin={setIsLogin} />} />
      <Route path="auth/registration" element={<RegistrationPage setIsLogin={setIsLogin} />} />
      <Route path="admin" element={<AdminPage isLogin={isLogin} setIsLogin={setIsLogin} />}>
        <Route path="regex" element={<RegexPage />} />
        <Route path="filtered-messages" element={<MessagesPage />} />
        <Route path="serves" element={<ServesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
