import React from "react";
import AdminEvents from './AdminEvents';
import AdminStarTeacher from "./AdminStarTeacher";

import {
  BookOpenText,
  UserRoundSearch,
  Soup,
  Star,
  SearchCheck,
  Ticket
} from "lucide-react";
import { useState } from "react";

function AdminTabsBar() {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "tab1", label: "Post Event" },
    { id: "tab2", label: "Star Teacher" }
  ];

  const tabIcons = {
    tab1: <Ticket />,
    tab2: <Star />
  };

  const tabContent = {
    tab1: <AdminEvents />,
    tab2: <AdminStarTeacher />
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-black flex justify-center text-white">
        {tabs.map((tab) => (
          <button
          type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 flex gap-3 rounded-t-lg py-2 font-semibold ${
              activeTab === tab.id ? "bg-white text-black" : ""
            }`}
          >
            <div>{tabIcons[tab.id]} </div>
            <div className={`${activeTab === tab.id? "visible" : "hidden"}`}>{tab.label}</div>
          </button>
        ))}
      </div>
      <div className="bg-white mx-4  rounded-lg">{tabContent[activeTab]}</div>
    </div>
  );
}

export default AdminTabsBar;
