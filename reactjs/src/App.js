import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import Layout from './Layout';
import PrivateRoute from './context/privateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index Component={AuthPage} />
          <Route path="/events" element={<PrivateRoute element={EventsPage} />} />
          <Route path="/bookings" element={<PrivateRoute element={BookingsPage} />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
