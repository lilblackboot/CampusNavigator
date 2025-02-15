import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}>
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to Campus Navigator</h1>
        <p className="text-xl md:text-2xl mb-8">Your ultimate guide to navigating the campus with ease.</p>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={() => navigate('/signup')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;