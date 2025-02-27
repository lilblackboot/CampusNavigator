import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import '@fontsource/montserrat'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;