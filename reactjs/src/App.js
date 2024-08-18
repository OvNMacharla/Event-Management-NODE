import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import Layout from './Layout';
import AuthContext from './context/auth-context';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({ token: null, userId: null, tokenExpiration: null });

  const login = (token, userId) => {
    setAuth({
      token,
      userId
    })
  };

  const logout = () => {
    setAuth({
      token: null,
      userId: null
    })
  }

  return (

    <AuthContext.Provider value={{ token: auth.token, userId: auth.userId, login: login, logout: logout }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index Component={AuthPage} />
            <Route path="/events" Component={EventsPage} />
            <Route path="/bookings" Component={BookingsPage} />
          </Route>
        </Routes>
      </BrowserRouter >
    </AuthContext.Provider>
  );
}

export default App;
