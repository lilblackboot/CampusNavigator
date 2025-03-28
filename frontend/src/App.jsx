import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import EventDetails from './pages/EventDetails';
import ChangeCredentials from './pages/ChangeCredentials';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/change-credentials" element={<ChangeCredentials />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;