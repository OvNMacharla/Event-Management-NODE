import './App.css';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/auth" Component={AuthPage} />
          <Route path="/events" Component={EventsPage} />
          <Route path="/bookings" Component={BookingsPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
