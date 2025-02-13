import React from 'react'
import Attendance from './Attendance'
import FindMyTeacher from './FindMyTeacher'
import FindMyFood from './FindMyFood'   
import StarTeachers from './StarTeachers'
import GeneralNavigator from './GeneralNavigator'  
import { useState } from 'react' 



function TabsBar() {

const [activeTab, setActiveTab] = useState("tab1")  

const tabs = [
    {id:"tab1", label:"Attendence" },
    {id:"tab2", label:"Find My Teacher"},
    {id:"tab3", label:"Find My Food"},
    {id:"tab4", label:"Star Teachers"},
    {id:"tab5", label:"Navigator"}
]

const tabContent = {
    tab1 : (<Attendance/>),
    tab2 : (<FindMyTeacher/>),
    tab3 : (<FindMyFood/>), 
    tab4 : (<StarTeachers/>),
    tab5 : (<GeneralNavigator/>)
}

  return (
    <div className='bg-black min-h-screen'>
        <div className='bg-black flex justify-center text-white'>
            {tabs.map((tab)=>(
                <button key={tab.id} onClick={()=> setActiveTab(tab.id)} className={`px-4 rounded-t-lg py-2 font-semibold ${activeTab === tab.id ? 'bg-white text-black': ""}`}>{tab.label}</button>
            ))}
        </div>
        <div className='bg-white mx-4 min-h-content  rounded-lg'>
            {tabContent[activeTab]}
        </div>
    </div>
  )
}

export default TabsBar