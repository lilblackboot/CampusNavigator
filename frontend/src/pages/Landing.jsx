import React from 'react';
import { useNavigate } from 'react-router-dom';
import GradientText from '../components/ui/GradientText';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import {Binoculars} from 'lucide-react'

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}>
        <div id="Mainpart" className="relative bg-black overflow-x-hidden bg-opacity-50 min-h-screen flex flex-col justify-center items-center text-center text-white p-4">
          <div className='flex gap-4 justify-center items-center'><Binoculars size={65}/><h1 className="text-5xl md:text-7xl font-bold mb-4"> GoGuide</h1></div>
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
          <div className="absolute bottom-4 w-full flex justify-center">
            <ScrollVelocity
              texts={['Scroll Down']} 
              velocity={100} 
              className="custom-scroll-text"
            />
          </div>
        </div>
      </div>

      <section id="intro" className="min-h-screen p-8 bg-white text-black flex flex-col justify-center">
        <p className="text-lg">Campus Navigator is your ultimate guide to navigating the campus with ease. Whether you're a student, faculty, or visitor, our platform helps you find your way around the campus effortlessly.</p>
      </section>

      <section id="features" className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside">
          <li className="text-lg mb-2">Real-time campus maps</li>
          <li className="text-lg mb-2">Find your classes and events</li>
          <li className="text-lg mb-2">Locate campus facilities</li>
          <li className="text-lg mb-2">Get notifications for important updates</li>
        </ul>
      </section>

      <section id="get-started" className="min-h-screen p-8 bg-white text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Get Started</h2>
        <p className="text-lg">Sign up today and start navigating the campus like a pro!</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 mt-4"
          onClick={() => navigate('/signup')}
        >
          Register Now
        </button>
      </section>

      <section id="about-us" className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg">Campus Navigator is developed by a team of dedicated professionals who are passionate about making campus navigation easier for everyone. Our mission is to provide a seamless and intuitive navigation experience for all campus users.</p>
      </section>

      <section id="makers" className="min-h-screen p-8 bg-white text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Meet the Makers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=1" alt="Maker 1" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Maker 1</h3>
            <p className="text-gray-700">Role: Developer</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=2" alt="Maker 2" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Maker 2</h3>
            <p className="text-gray-700">Role: Designer</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=3" alt="Maker 3" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Maker 3</h3>
            <p className="text-gray-700">Role: Project Manager</p>
          </div>
        </div>
      </section>

      <section id="contact-us" className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
            <input className="w-full p-2 border border-gray-300 rounded" type="text" id="name" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
            <input className="w-full p-2 border border-gray-300 rounded" type="email" id="email" name="email" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="message">Message</label>
            <textarea className="w-full p-2 border border-gray-300 rounded" id="message" name="message" rows="4" required></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300" type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default Landing;