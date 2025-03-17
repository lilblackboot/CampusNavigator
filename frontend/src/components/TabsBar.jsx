import React from "react";
import Events from "./Events";
import Attendance from "./Attendance";
import FindMyFood from "./FindMyFood";
import StarTeachers from "./StarTeachers";
import {motion} from "framer-motion";
import RotatingText from "./ui/RotatingText";
import GradientText from "./ui/GradientText";
import HomePage from "./HomePage";
import {
  BookOpenText,
  UserRoundSearch,
  Soup,
  Star,
  SearchCheck,
  Ticket
} from "lucide-react";
import { useState } from "react";

function TabsBar({ activeTab, setActiveTab }) {
  

  const tabs = [
    { id: "tab1", label: "Assistant" },
    { id: "tab2", label: "Find My Food" },
    { id: "tab3", label: "Star Teachers" },
    { id: "tab4", label: "Events" },
  ];

  const tabIcons = {
    tab1: <UserRoundSearch />,
    tab2: <Soup />,
    tab3: <Star />,
    tab4: <Ticket />
  };

  const tabContent = {
    tab1: <Attendance />,
    tab2: <FindMyFood />,
    tab3: <StarTeachers />,
    tab4: <Events/>
  };

  return (
    <div className="bg-black bg-cover min-h-screen">
      
      <div className="flex  justify-center  text-white">
        { activeTab===""?

        <HomePage setActiveTab={setActiveTab} />
        
       
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
