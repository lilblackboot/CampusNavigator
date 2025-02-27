import React from "react";
import Events from "./Events";
import Attendance from "./Attendance";
import FindMyTeacher from "./FindMyTeacher";
import FindMyFood from "./FindMyFood";
import StarTeachers from "./StarTeachers";
import GeneralNavigator from "./GeneralNavigator";
import {motion} from "framer-motion";

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
  const [activeTab, setActiveTab] = useState(null);

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
    <div className="bg-black min-h-screen">
      <div className="bg-black flex justify-center text-white">
        {activeTab===null?<div>

<header className="">
  <h1 className="font-bold text-7xl">Welcome back! user</h1>
</header>
<main>
  <div id="attendance/chatbot"></div>
  <div id='star teachers'></div>
  <div id="find my food"></div>
  <div id="events"></div>
</main>

        </div>
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
      <div className="bg-white mx-4  rounded-lg">{activeTab===null ?tabContent[activeTab]:tabContent[activeTab]}</div>
    </div>
  );
}

export default TabsBar;
