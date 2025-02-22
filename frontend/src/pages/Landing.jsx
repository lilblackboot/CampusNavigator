import React, { useState, useRef, useEffect } from "react";
import TiltedCard from "../components/ui/TiltedCard";
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

function Landing() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const items = [
    'Item 1',
    <div key='jsx-item-1'>Custom JSX Content</div>,
    'https://images.collegedunia.com/public/college_data/images/appImage/1599193361PuCampus.jpg?mode=stretch',
    'Item 2',
    <div key='jsx-item-2'>Custom JSX Content</div>,
    'Item 4',
    <div key='jsx-item-2'>Custom JSX Content</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Item 5',
    <div key='jsx-item-2'>Custom JSX Content</div>,
    'Item 7',
    <div key='jsx-item-2'>Custom JSX Content</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Item 8',
    <div key='jsx-item-2'>Custom JSX Content</div>,
    'Item 10',
    <div key='jsx-item-3'>Custom JSX Content</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Item 11',
    <div key='jsx-item-2'>Custom JSX Content</div>,
    'Item 13',
    <div key='jsx-item-4'>Custom JSX Content</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Item 14',
    // Add more items as needed
  ];
  

  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

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
      <nav className="bg-black text-white p-4 fixed flex w-full z-10">
        <div className="container  flex justify-between items-center">
          <div className="text-2xl font-bold flex justify-center hover:drop-shadow-[0_0_10px_#ffffff] items-center gap-2">        
            <Binoculars className="" size={25} />
            GoGuide
          </div>
          <div className="space-x-4  flex items-center">
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
            <div className="flex p-5 py-7 flex-col rounded-3xl justify-center items-center bg-[#00000057]">
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
              </div>
            </div>
          </FadeContent>

          <div className="absolute overflow-hidden bottom-4 w-full flex justify-center">
            <ScrollVelocity
              texts={["Scroll Down"]}
              velocity={100}
              className="custom-scroll-text text-black "
            />
          </div>
        </div>
      </div>

      <section
        id="intro"
        className="min-h-screen p-0 m-0 overflow-hidden bg-transparent text-black flex flex-col justify-center"
      >
        <div className="absolute m-0 p-0 bg-black w-full z-[-1]  h-screen"> <GridMotion items={items} /></div>
       <div/>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold mb-9 m-8 text-white"
        >
          Smart Campus Navigator
        </motion.h2>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-lg m-8 text-white"
        >
          Navigating campus life just got easier! GoGuide is your all-in-one
          smart assistant, designed to help students and faculty manage their
          daily tasks with ease. Whether you’re looking for your professor,
          tracking your assignments, or finding the best food spots on campus,
          GoGuide has got you covered!
        </motion.p>
      </section>

      <section
        id="features"
        className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside">
          <li className="text-lg mb-2">
            🚀 Find My Teacher – Locate professors and check their schedules in
            real-time.
          </li>
          <li className="text-lg mb-2">
            📍 Classroom Navigator – Never get lost again! Find your classrooms
            instantly.
          </li>
          <li className="text-lg mb-2">
            📝 Submission Tracker – Keep track of deadlines and submission
            details effortlessly.
          </li>
          <li className="text-lg mb-2">
            📅 Event Tracker – Stay updated on campus events and never miss out
            on important happenings.
          </li>
          <li className="text-lg mb-2">
            🍔 Find My Food – Discover top-rated food spots and meal options.
          </li>
          <li className="text-lg mb-2">
            📊 Attendance Manager – Monitor your attendance and check leave
            eligibility.
          </li>
          <li className="text-lg mb-2">
            🤖 Chatbot Assistant – Get instant answers to your queries with our
            AI-powered chatbot.
          </li>
        </ul>
      </section>

      <section
        id="get-started"
        className="min-h-screen p-8 bg-white text-black flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-4">Get Started</h2>
        <p className="text-lg">
          Sign up today and start navigating the campus like a pro!
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4  rounded-full transition duration-300 mt-4"
          onClick={() => navigate("/signup")}
        >
          Register Now
        </button>
      </section>

      <section
        id="about-us"
        className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg">
          At GoGuide, we believe that campus life should be smooth and
          stress-free. Our mission is to empower students and faculty with a
          smart, efficient, and user-friendly solution to simplify navigation
          and daily academic tasks. Whether you’re a newcomer or a seasoned
          student, GoGuide is here to enhance your campus experience.
        </p>
      </section>

      <section
        id="makers"
        className="min-h-screen  p-8 bg-black text-white flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-4">Meet the Makers</h2>
        <p className="text-lg mb-8">
          GoGuide is brought to you by a passionate team of tech enthusiasts
          from Parul Institute of Technology, Parul University. Our team
          members:
        </p>
        <div className="flex gap-7 gap-y-10 flex-wrap justify-around">
          <TiltedCard
            imageSrc="./yash.jpg"
            altText="Yash"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Yash Chauhan
              </p>
            }
          />
          <TiltedCard
            imageSrc="./suzan.jpg"
            altText="Suzan"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Suzan Mansuri
              </p>
            }
          />
          <TiltedCard
            imageSrc="./swapnendu.png"
            altText="Swepnendu"
            captionText="Developer"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Swapnendu Karmakar
              </p>
            }
          />
          <TiltedCard
            imageSrc="./shweta.jpg"
            altText="Swepnendu"
            captionText="Mentor"
            containerHeight="250px"
            containerWidth="250px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text justify text-white bg-[#0707076e] rounded-2xl px-2 m-3">
                Ms. Shweta Gupta
              </p>
            }
          />{" "}
        </div>
      </section>

      <section
        id="contact-us"
        className="min-h-screen p-8 bg-gray-100 text-black flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="message"
              name="message"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Landing;
