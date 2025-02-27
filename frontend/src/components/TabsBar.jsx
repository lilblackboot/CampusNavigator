import React from "react";
import Events from "./Events";
import Attendance from "./Attendance";
import FindMyTeacher from "./FindMyTeacher";
import FindMyFood from "./FindMyFood";
import StarTeachers from "./StarTeachers";
import GeneralNavigator from "./GeneralNavigator";
import {motion} from "framer-motion";
import RotatingText from "./ui/RotatingText";
import GradientText from "./ui/GradientText";

import {
  BookOpenText,
  UserRoundSearch,
  Soup,
  Star,
  SearchCheck,
  Ticket
} from "lucide-react";
import { useState } from "react";

function TabsBar() {
  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    { id: "tab1", label: "Attendence" },
    { id: "tab2", label: "Find My Teacher" },
    { id: "tab3", label: "Find My Food" },
    { id: "tab4", label: "Star Teachers" },
    { id: "tab5", label: "Navigator" },
    { id: "tab6", label: "Events" },
  ];

  const tabIcons = {
    tab1: <BookOpenText />,
    tab2: <UserRoundSearch />,
    tab3: <Soup />,
    tab4: <Star />,
    tab5: <SearchCheck />,
    tab6: <Ticket />
  };

  const tabContent = {
    tab1: <Attendance />,
    tab2: <FindMyTeacher />,
    tab3: <FindMyFood />,
    tab4: <StarTeachers />,
    tab5: <GeneralNavigator />,
    tab6: <Events/>
  };

  return (
    <div className="bg-[url(https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover min-h-screen">
      
      <div className="flex justify-center  text-white">
        { activeTab===""?<div>

<header className=" flex absolute left-0 pl-6  bg-[#0000009c] flex-col  h-screen justify-center items-start  w-full  text-white ">
  <motion.h1 className="font-bold flex font-montserrat m-0  text-7xl">Welcome back,<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Suzan
</GradientText></motion.h1>
  <div className="flex gap-2 items-center text-5xl my-8"><p className="">Lets get to your  </p>
  
  <RotatingText
    texts={['Teachers', 'Food', 'Events', 'Classes']}
    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
    staggerFrom={"last"}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "120%" }}
    staggerDuration={0.025}
    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
    transition={{ type: "spring", damping: 30, stiffness: 400 }}
    rotationInterval={2000}
  /> </div>
</header>
<main>
  <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab1')}>Teacher</button>
  <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab1')}>Navigator</button>
  <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab1')}>Events</button>
  <button className="rounded-2xl bg-amber-400 scale-z-100 p-6 text-black" onClick={()=>setActiveTab('tab1')}>food</button>
  </main></div>
        :
        
        tabs.map((tab) => (
          <button
          type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 flex gap-3 rounded-t-lg py-2 font-semibold ${
              activeTab === tab.id ? "bg-white text-black" : ""
            }`}
          >
            <motion.div 
            whileHover={{ scale: 1.5, duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
            >{tabIcons[tab.id]} </motion.div>
            <div className={`${activeTab === tab.id? "visible" : "hidden"}`}>{tab.label}</div>
          </button>
        ))}
      </div>
      <div className="bg-white mx-4  rounded-lg">{activeTab==='' ?<div></div>:tabContent[activeTab]}</div>
    </div>
  );
}

export default TabsBar;
