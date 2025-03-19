import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import GradientText from "../components/ui/GradientText";
import ScrollVelocity from "../components/ui/ScrollVelocity";
import { Binoculars } from "lucide-react";
// import Squares from "../components/ui/Squares";
import Ballpit from "../components/ui/Ballpit";
// import Aurora from "../components/ui/Aurora";
import Particles from "../components/ui/Particles";
import FadeContent from "../components/ui/FadeContent";
import { useInView, motion } from "framer-motion";
import GridMotion from "../components/ui/GridMotion";
import Features from "../components/Features";
import GetStarted from "../components/GetStarted";
import Intro from "../components/Intro";
import Makers from "../components/Makers";
import AboutUs from "../components/AboutUs.jsx";
import * as m from "motion/react-client";

function Landing() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainpart = document.getElementById("Mainpart");
      if (mainpart) {
        const mainpartHeight = mainpart.offsetHeight;
        const scrollPosition = window.scrollY;
        setShowButtons(scrollPosition > mainpartHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className="bg-black text-white p-4 fixed flex w-full z-10 ">
        <div className="container  flex justify-between items-center">
          <div className="text-2xl font-bold flex justify-center hover:drop-shadow-[0_0_10px_#ffffff] items-center gap-2">
            <Binoculars className="font-bold" size={35} />
            {/* GoGuide */}
          </div>
          <div className="space-x-4  flex justify-between items-center">
            <Link
              to="intro"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-400"
            >
              Intro
            </Link>
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-400"
            >
              Features
            </Link>
            <Link
              to="about-us"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-400"
            >
              About
            </Link>
            <Link
              to="makers"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-400"
            >
              Makers
            </Link>
            <Link
              to="contact-us"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-400"
            >
              Contact
            </Link>
            {showButtons && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-cover bg-center">
        <div
          id="Mainpart"
          className=" bg-transparent overflow-x-hidden  bg-opacity-50 min-h-screen flex flex-col justify-center items-center text-center text-white p-4"
        >
          <div className="absolute bg-black w-full z-[-1]  h-screen">
            {/* <Squares
              speed={0.5}
              squareSize={20}
              direction="up" // up, down, left, right, diagonal
              borderColor="#fff"
              hoverFillColor="#222"
            /> */}
            <Ballpit
              count={200}
              gravity={0.5}
              friction={0.9}
              wallBounce={0.95}
              followCursor={false}
              colors={["#3A29FF", "#FF94B4", "#FF3232"]}
            />
            {/* <Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  speed={1.6}
/> */}
            {/* <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={true}
  /> */}
          </div>

          {/* <div className="" style={{ position: 'absolute',zIndex:0, overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
 
</div> */}

          <FadeContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
          >
            {/* Anything placed inside this container will be fade into view */}
            <div className="flex p-5 py-7 flex-col rounded-3xl justify-cent items-center bg-[#00000057]">
              <div className="flex  gap-4 hover:drop-shadow-[0_0_10px_#ffffff] justify-center items-center">
                <Binoculars className="" size={65} />
                <h1 className="text-5xl md:text-7xl font-bold text-white  mb-4">
                  GoGuide
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8">
                Your Ultimate Campus Companion.
              </p>

              <div className="flex space-x-4">
                <m.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </m.button>
                <m.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </m.button>
              </div>
            </div>
          </FadeContent>

          <div className="absolute bg-[#ffffff48] overflow-hidden bottom-0 w-full flex justify-center mb-0 pb-0">
            <ScrollVelocity
              texts={["Scroll Down"]}
              velocity={100}
              className="custom-scroll-text text-black "
            />
          </div>
        </div>
      </div>

      <Intro />

      <Features />
      {/* <GetStarted />

      <AboutUs /> */}

      <Makers />

      <section
        id="contact-us"
        className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center"
      >
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Contact Us
          </h2>
          <p className="text-lg text-center text-gray-600 mb-8">
            We'd love to hear from you! Whether you have a question about
            features, trials, pricing, need a demo, or anything else, our team
            is ready to answer all your questions.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-lg font-medium mb-2 text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2 text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-medium mb-2 text-gray-700"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="message"
                name="message"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                className="bg-black hover:bg-white hover:text-black border text-white font-bold py-3 px-6 rounded-full transition duration-300"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Landing;
