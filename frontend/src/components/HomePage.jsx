import React, { useMemo } from "react";
import { motion } from "framer-motion";
import GradientText from "./ui/GradientText";
import RotatingText from "./ui/RotatingText";
import { HoverImageLinks } from "./ui/HoverImageLinks";

// Star Component for creating random, animated stars
const Star = ({ size, x, y, delay, duration }) => {
  return (
    <motion.div
      className="absolute bg-white rounded-full opacity-70"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.5, 1], 
        opacity: [0, 0.7, 0.3],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

// Background with Animated Stars
const StarryBackground = () => {
  // Generate a fixed number of stars with random properties
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // Random size between 1-4 pixels
      x: Math.random() * 100, // Random horizontal position
      y: Math.random() * 100, // Random vertical position
      delay: Math.random() * 2, // Random delay for staggered animation
      duration: Math.random() * 3 + 2, // Random duration between 2-5 seconds
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden ">
      {stars.map((star) => (
        <Star 
          key={star.id}
          size={star.size}
          x={star.x}
          y={star.y}
          delay={star.delay}
          duration={star.duration}
        />
      ))}
    </div>
  );
};

function HomePage({ setActiveTab }) {
  return (
    <div className="relative flex justify-center w-full h-screen overflow-hidden sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
      {/* Starry Background */}
      <StarryBackground />
      
      <div className="px-7 min-w-[900px] z-10 relative">
        <header className="flex pl-6 flex-col h-screen justify-center items-start w-[100%] text-white">
          <motion.h1 
            className="font-bold flex m-0 text-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome back,
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              Suzan
            </GradientText>
          </motion.h1>
          <div className="flex gap-2 items-center text-5xl my-8">
            <p className="">Lets get to your </p>
            <RotatingText
              texts={["Teachers", "Food", "Events", "Classes"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />{" "}
          </div>
        </header>
      </div>

      <div id="links" className="h-screen m-0 pt-10 lg:w-1/2 z-10 relative">
        <HoverImageLinks setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default HomePage;