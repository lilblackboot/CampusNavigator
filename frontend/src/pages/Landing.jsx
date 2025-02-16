import React from 'react';
import { useNavigate } from 'react-router-dom';
import GradientText from '../components/ui/GradientText';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import { Binoculars } from 'lucide-react';

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}>
        <div id="Mainpart" className="relative bg-black overflow-x-hidden bg-opacity-50 min-h-screen flex flex-col justify-center items-center text-center text-white p-4">
          <div className='flex gap-4 justify-center items-center'>
            <Binoculars size={65} />
            <h1 className="text-5xl md:text-7xl font-bold mb-4"> GoGuide</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8">Your Ultimate Campus Companion.</p>

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
        <h2 className="text-4xl font-bold mb-4">Your Smart Campus Assistant</h2>
        <p className="text-lg">Navigating campus life just got easier! GoGuide is your all-in-one smart assistant, designed to help students and faculty manage their daily tasks with ease. Whether you’re looking for your professor, tracking your assignments, or finding the best food spots on campus, GoGuide has got you covered!</p>
      </section>

      <section id="features" className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside">
          <li className="text-lg mb-2">🚀 Find My Teacher – Locate professors and check their schedules in real-time.</li>
          <li className="text-lg mb-2">📍 Classroom Navigator – Never get lost again! Find your classrooms instantly.</li>
          <li className="text-lg mb-2">📝 Submission Tracker – Keep track of deadlines and submission details effortlessly.</li>
          <li className="text-lg mb-2">📅 Event Tracker – Stay updated on campus events and never miss out on important happenings.</li>
          <li className="text-lg mb-2">🍔 Find My Food – Discover top-rated food spots and meal options.</li>
          <li className="text-lg mb-2">📊 Attendance Manager – Monitor your attendance and check leave eligibility.</li>
          <li className="text-lg mb-2">🤖 Chatbot Assistant – Get instant answers to your queries with our AI-powered chatbot.</li>
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
        <p className="text-lg">At GoGuide, we believe that campus life should be smooth and stress-free. Our mission is to empower students and faculty with a smart, efficient, and user-friendly solution to simplify navigation and daily academic tasks. Whether you’re a newcomer or a seasoned student, GoGuide is here to enhance your campus experience.</p>
      </section>

      <section id="makers" className="min-h-screen p-8 bg-white text-black flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">Meet the Makers</h2>
        <p className="text-lg mb-8">GoGuide is brought to you by a passionate team of tech enthusiasts from Parul Institute of Technology, Parul University. Our team members:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=1" alt="Yash Chauhan" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Yash Chauhan</h3>
            <p className="text-gray-700">Role: Developer</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=2" alt="Suzan Mansuri" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Suzan Mansuri</h3>
            <p className="text-gray-700">Role: Developer</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=3" alt="Swapnendu Karmakar" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Swapnendu Karmakar</h3>
            <p className="text-gray-700">Role: Developer</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://source.unsplash.com/random/150x150?sig=4" alt="Isha Rathode" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Isha Rathode</h3>
            <p className="text-gray-700">Role: Developer</p>
          </div>
        </div>
        <p className="text-lg mt-8">🎯 Guided by our dedicated supervisor, Sweta Gupta Mam, we have worked tirelessly to build a solution that makes student life more efficient and enjoyable.</p>
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