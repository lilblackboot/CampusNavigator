import React from "react";
import { motion } from "framer-motion";
import GradientText from "./ui/GradientText";
import RotatingText from "./ui/RotatingText";
import { HoverImageLinks } from "./ui/HoverImageLinks";

function HomePage({ setActiveTab }) {
  return (
    <div className="flex  justify-center bg-[#0000009c] w-full sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
      <div className="px-7 min-w-[900px]">
        <header className=" flex   pl-6 flex-col  h-screen  justify-center items-start  w-[100%] text-white ">
          <motion.h1 className="font-bold flex m-0  text-7xl">
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
        {/* <main>
      <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab1')}>Teacher</button>
      <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab2')}>Navigator</button>
      <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab6')}>Events</button>
      <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab3')}>food</button>
      </main> */}
      </div>

      <div id="links" className="h-screen m-0 pt-10 lg:w-1/2 ">
        <HoverImageLinks setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default HomePage;
