import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import ChatBot from "./ChatBot";
import * as m from 'motion/react-client'

function Attendance() {
  const { user } = useUser();
  const [currentAttendance, setCurrentAttendance] = useState(85);
  const [classesAttended, setClassesAttended] = useState(34);
  const [totalClasses, setTotalClasses] = useState(40);

  // State variables for attendance calculator
  const [totalSlots, setTotalSlots] = useState(0);
  const [attendedSlots, setAttendedSlots] = useState(0);
  const [targetAttendance, setTargetAttendance] = useState(75);
  const [calculationResult, setCalculationResult] = useState(null);

  const [showSlotForm, setShowSlotForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  // Get current day of the week
  const getCurrentDay = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  // Calculate attendance and required/possible bunks
  const calculateAttendance = () => {
    if (totalSlots === 0) {
      setError("Total slots cannot be 0");
      return;
    }

    const currentPercentage = (attendedSlots / totalSlots) * 100;

    if (currentPercentage >= targetAttendance) {
      // Calculate how many classes can be bunked while maintaining target attendance
      // Formula: (attended - (target * total)/100) = classes that can be bunked
      const possibleBunks = Math.floor(
        attendedSlots - (targetAttendance * totalSlots) / 100
      );
      setCalculationResult({
        type: "positive",
        percentage: currentPercentage.toFixed(2),
        classes: possibleBunks,
      });
    } else {
      // Calculate how many additional classes are needed
      // Using the weekly schedule pattern from slots

      // Calculate total weekly slots
      const weeklySlots = Object.values(slots).reduce(
        (sum, count) => sum + count,
        0
      );

      if (weeklySlots === 0) {
        setError("You need to configure your weekly schedule first");
        return;
      }

      // Calculate how many more classes needed to reach target attendance
      // Formula: Find x where: (attended + x) / (total + x) = target/100
      // Solving for x: x = (target*total - 100*attended) / (100 - target)
      const classesNeeded = Math.ceil(
        (targetAttendance * totalSlots - 100 * attendedSlots) /
          (100 - targetAttendance)
      );

      // Get the current day of the week
      const currentDay = getCurrentDay();

      // Create an array of days in order starting from tomorrow
      const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      const currentDayIndex = days.indexOf(currentDay);

      // Reorder days to start from tomorrow
      const orderedDays = [
        ...days.slice(currentDayIndex + 1),
        ...days.slice(0, currentDayIndex + 1),
      ];

      // Create detailed breakdown of classes to add per day
      const slotBreakdown = {};
      days.forEach((day) => {
        slotBreakdown[day] = 0;
      });

      // Track available capacity for each day (using the actual scheduled slots as max capacity)
      const availableCapacity = {};
      Object.entries(slots).forEach(([day, count]) => {
        // Each day's capacity is based on user's actual schedule
        availableCapacity[day] = count > 0 ? count : 0;
      });

      // Calculate total available capacity across all days
      const totalAvailableCapacity = Object.values(availableCapacity).reduce(
        (sum, count) => sum + count,
        0
      );

      // Check if we have enough capacity for all needed classes
      const weeksNeeded = Math.ceil(classesNeeded / totalAvailableCapacity);
      let remainingToAllocate = classesNeeded;
      let extraWeeksNeeded = 0;

      // Allocate classes starting from tomorrow and going forward
      for (let week = 0; week < weeksNeeded; week++) {
        // Get days with available capacity and start from tomorrow
        const sortedDays = orderedDays
          .filter((day) => availableCapacity[day] > 0)
          .map((day) => [day, slots[day]]);

        if (sortedDays.length === 0) {
          // No days have available capacity
          extraWeeksNeeded = Math.ceil(
            remainingToAllocate / totalAvailableCapacity
          );
          break;
        }

        // First pass: distribute classes proportionally to original schedule
        if (week === 0) {
          sortedDays.forEach(([day, count]) => {
            if (remainingToAllocate > 0 && availableCapacity[day] > 0) {
              // Calculate proportion based on original schedule
              const proportion = count / weeklySlots;
              const allocate = Math.min(
                Math.ceil(totalAvailableCapacity * proportion), // Proportional allocation
                availableCapacity[day], // Respecting max per day
                remainingToAllocate // Don't allocate more than needed
              );

              slotBreakdown[day] += allocate;
              remainingToAllocate -= allocate;
            }
          });
        }

        // Second pass: distribute remaining classes for this week
        // Use round-robin through the ordered days (starting from tomorrow)
        let index = 0;
        while (remainingToAllocate > 0 && index < sortedDays.length) {
          const [day, _] = sortedDays[index];

          if (
            availableCapacity[day] > 0 &&
            slotBreakdown[day] < availableCapacity[day]
          ) {
            slotBreakdown[day] += 1;
            remainingToAllocate -= 1;
          }

          // Move to next day
          index = (index + 1) % sortedDays.length;

          // If we've gone through all days once, break to move to next week
          if (index === 0 && remainingToAllocate > 0) {
            break;
          }
        }
      }

      // Calculate the new totals after adding these classes
      const newTotal = totalSlots + classesNeeded;
      const newAttendance = (
        ((attendedSlots + classesNeeded) / newTotal) *
        100
      ).toFixed(2);

      // Calculate how many weeks this represents
      const totalAddedClasses = Object.values(slotBreakdown).reduce(
        (sum, count) => sum + count,
        0
      );
      const fullWeeks = Math.floor(totalAddedClasses / totalAvailableCapacity);
      const remainingClasses = totalAddedClasses % totalAvailableCapacity;

      setCalculationResult({
        type: "negative",
        percentage: currentPercentage.toFixed(2),
        classesNeeded: classesNeeded,
        totalAddedClasses: totalAddedClasses,
        fullWeeks: fullWeeks,
        remainingClasses: remainingClasses,
        newTotal: newTotal,
        newPercentage: newAttendance,
        slotBreakdown: slotBreakdown,
        extraWeeksNeeded: extraWeeksNeeded,
        currentDay: currentDay,
      });
    }
  };

  useEffect(() => {
    if (user) {
      // Check for valid MongoDB ObjectId
      if (!user.id || typeof user.id !== "string" || user.id.length !== 24) {
        setError("Invalid user ID format. Please log out and log in again.");
        setShowSlotForm(false);
        setLoading(false);
        return;
      }
      fetchUserSlots();
    } else {
      setShowSlotForm(true);
      setLoading(false);
    }
  }, [user]);

  const fetchUserSlots = async () => {
    if (!user?.id) {
      console.log("No valid user ID available");
      setShowSlotForm(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Using the proxy - no need for full URL
      const response = await axios.get(`/api/slots/${user.id}`);

      if (response.data.slots) {
        setSlots(response.data.slots);
        setShowSlotForm(false);
      } else {
        setShowSlotForm(true);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      // Show form for 404 (first time users) but show error for other status codes
      if (error.response?.status === 404) {
        setShowSlotForm(true);
      } else {
        setError("Failed to load your schedule. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSlotChange = (day, value) => {
    const numValue = parseInt(value) || 0;
    // No fixed max per day - user can set their own schedule

    setSlots((prevSlots) => ({
      ...prevSlots,
      [day]: numValue,
    }));
  };

  const saveSlots = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setError(
        "User ID not found. Please try logging out and logging in again."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const totalSlots = Object.values(slots).reduce(
        (sum, count) => sum + count,
        0
      );
      if (totalSlots === 0) {
        setError("Please add at least one class slot before saving.");
        setLoading(false);
        return;
      }

      // Using the proxy - no need for full URL
      const response = await axios.post("/api/slots", {
        userId: user.id,
        slots,
      });

      if (response.data) {
        setShowSlotForm(false);
        setEditMode(false);
        setError(null);
      }
    } catch (error) {
      console.error("Error saving slots:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save your schedule. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalWeeklySlots = Object.values(slots).reduce(
    (sum, value) => sum + value,
    0
  );

  const SlotConfiguration = () => (
    <div className="">
    
      <p className="mb-4 text-gray-600">
        Please enter the number of class slots you have on each day of the week:
      </p>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={saveSlots}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.keys(slots).map((day) => (
            <div key={day} className="flex items-center">
              <label className="w-32 capitalize">{day}:</label>
              <input
                type="number"
                min="0"
                value={slots[day]}
                onChange={(e) => handleSlotChange(day, e.target.value)}
                className="ml-2 p-2 border rounded w-20 text-center"
              />
              {/* <span className="ml-2">slots</span> */}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-medium">
            Total weekly slots:{" "}
            <span className="text-blue-600">{totalWeeklySlots}</span>
          </p>
          <div className="flex gap-3">
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  fetchUserSlots();
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Schedule"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const AttendanceCalculator = () => (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl ">
      <h3 className="text-2xl font-semibold mb-4">Attendance Calculator</h3>
      <div className="space-y-4">
        <div className="flex flex-col gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Slots
            </label>
            <input
              type="number"
              min="0"
              value={totalSlots}
              onChange={(e) => setTotalSlots(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attended Slots
            </label>
            <input
              type="number"
              min="0"
              max={totalSlots}
              value={attendedSlots}
              onChange={(e) => setAttendedSlots(parseInt(e.target.value)||0)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Attendance (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={targetAttendance}
              onChange={(e) =>
                setTargetAttendance(parseInt(e.target.value) || 0)
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          onClick={calculateAttendance}
          className="w-full px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        {calculationResult && (
          <div
            className={`mt-4 p-4 rounded ${
              calculationResult.type === "positive"
                ? "bg-green-100"
                : "bg-yellow-100"
            }`}
          >
            <p className="text-lg mb-2">
              Current Attendance: {calculationResult.percentage}%
            </p>
            {calculationResult.type === "positive" ? (
              <p className="text-green-700">
                You can safely miss {calculationResult.classes} more{" "}
                {calculationResult.classes === 1 ? "class " : "classes "}
                while maintaining {targetAttendance}% attendance.
              </p>
            ) : (
              <>
                <p className="text-yellow-700 mb-2">
                  You need to attend {calculationResult.classesNeeded} more{" "}
                  {calculationResult.classesNeeded === 1 ? "class" : "classes"}
                  to reach {targetAttendance}% attendance.
                </p>
                {(calculationResult.fullWeeks > 0 ||
                  calculationResult.remainingClasses > 0) && (
                  <p className="text-gray-700 mb-1">
                    Based on your schedule, this represents{" "}
                    {calculationResult.fullWeeks} full{" "}
                    {calculationResult.fullWeeks === 1 ? "week" : "weeks"}
                    {calculationResult.remainingClasses > 0
                      ? ` plus ${
                          calculationResult.remainingClasses
                        } additional ${
                          calculationResult.remainingClasses === 1
                            ? "class"
                            : "classes"
                        }`
                      : ""}
                    .
                  </p>
                )}
                <p className="text-gray-700 mb-2">
                  This would increase your total slots from {totalSlots} to{" "}
                  {calculationResult.newTotal}, resulting in an attendance of{" "}
                  {calculationResult.newPercentage}%.
                </p>
                <div className="mt-3 pt-3 border-t border-yellow-200">
                  <p className="text-sm font-medium mb-2">
                    Additional classes needed per day (starting from{" "}
                    {calculationResult.currentDay === getCurrentDay()
                      ? "tomorrow"
                      : "the day after today"}
                    ):
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Reorder the days to start from tomorrow */}
                    {(() => {
                      const days = [
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ];
                      const currentDayIndex = days.indexOf(
                        calculationResult.currentDay
                      );
                      const orderedDays = [
                        ...days.slice(currentDayIndex + 1),
                        ...days.slice(0, currentDayIndex + 1),
                      ];

                      return orderedDays.map(
                        (day) =>
                          calculationResult.slotBreakdown[day] > 0 && (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day}:</span>
                              <span>
                                {calculationResult.slotBreakdown[day]}{" "}
                                {calculationResult.slotBreakdown[day] === 1
                                  ? "class"
                                  : "classes"}
                              </span>
                            </div>
                          )
                      );
                    })()}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-xl">Loading your attendance data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white grid gap-4 grid-cols-3  grid-row-5 rounded-3xl ">
        <div className=" grid grid-cols-3 min-h-3 gap-4 rounded-2xl m-3 col-span-2 p-3">
          <m.div  
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
            }} 
            className="bg-[#48c886] text-white font-semibold py-20 rounded-3xl text-center">Current Attendance</m.div>
          <m.div 
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{
            delay: 0.2,
               duration: 0.4,
               scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
           }} 
          className="bg-[#7034ff] text-white font-semibold py-20 rounded-3xl text-center">total slots</m.div>
          <m.div 
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{
            delay: 0.4,
               duration: 0.4,
               scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
           }} 
          className="bg-[#ff822c] text-white font-semibold py-20 rounded-3xl text-center">attended</m.div>
        </div>
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
              duration: 0.8,
              
              ease: [0, 0.71, 0.2, 1.01],}}
        className="bg-[#d7d7e3]  mt-6 rounded-2xl row-span-5 m-3 h-content flex flex-col items-center p-3">
          <h1 className="font-bold">Assistant Bot</h1>
          <ChatBot />
        </m.div>
        <m.div
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{
             duration: 0.8,
             
             ease: [0, 0.71, 0.2, 1.01],}}
        className="bg-[#d7d7e3] min-h-3 rounded-2xl m-3 row-span-4 p-3 ">
          <AttendanceCalculator />
        </m.div>
        <m.div
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{
             duration: 0.8,
             
             ease: [0, 0.71, 0.2, 1.01],}}
        className="bg-[#d7d7e3] min-h-3 rounded-2xl m-3 row-span-4 p-3">
          <div className=" w-full max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">
                  Weekly Class Schedule
                </h3>
               {editMode?'': <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-white text-gray-800 border-black border-1 rounded hover:bg-gray-300"
                >
                  Edit Schedule
                </button>}
              </div>

              {editMode === true ? 
                <SlotConfiguration />:

              <div className=" ">
                {Object.entries(slots).map(([day, count]) => (
                  <div key={day} className="flex justify-between  pb-3">
                    <span className="capitalize font-medium">{day}:</span>
                    <span>
                      {count} {count === 1 ? "class" : "classes"}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-blue-600 md:col-span-2 mt-2 pt-2 border-t">
                  <span>Total Weekly Classes:</span>
                  <span>{totalWeeklySlots}</span>
                </div>
              </div>}
            </div>
          </div>
        </m.div>
      </div>
    </>

    // <div className="min-h-screen p-8 bg-gray-100 text-black flex flex-col items-center">
    //   <h2 className="text-4xl font-bold mb-8">Attendance Manager</h2>
    //   <AttendanceCalculator />
    //   {showSlotForm ? (
    //     <SlotConfiguration />
    //   ) : (
    //     <>
    //       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
    //         <div className="bg-white rounded-lg shadow-md p-6 text-center">
    //           <h3 className="text-2xl font-semibold mb-4">Current Attendance</h3>
    //           <p className="text-5xl font-bold text-green-500">{currentAttendance}%</p>
    //         </div>
    //         <div className="bg-white rounded-lg shadow-md p-6 text-center">
    //           <h3 className="text-2xl font-semibold mb-4">Classes Attended</h3>
    //           <p className="text-5xl font-bold text-blue-500">{classesAttended}</p>
    //         </div>
    //         <div className="bg-white rounded-lg shadow-md p-6 text-center">
    //           <h3 className="text-2xl font-semibold mb-4">Total Classes</h3>
    //           <p className="text-5xl font-bold text-red-500">{totalClasses}</p>
    //         </div>
    //       </div> */}

    // <div className="mt-10 w-full max-w-4xl">
    //   <div className="bg-white rounded-lg shadow-md p-6">
    //     <div className="flex justify-between items-center mb-4">
    //       <h3 className="text-2xl font-semibold">Weekly Class Schedule</h3>
    //       <button
    //         onClick={() => setEditMode(true)}
    //         className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
    //       >
    //         Edit Schedule
    //       </button>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
    //       {Object.entries(slots).map(([day, count]) => (
    //         <div key={day} className="flex justify-between border-b pb-2">
    //           <span className="capitalize font-medium">{day}:</span>
    //           <span>{count} {count === 1 ? 'class' : 'classes'}</span>
    //         </div>
    //       ))}
    //       <div className="flex justify-between font-semibold text-blue-600 md:col-span-2 mt-2 pt-2 border-t">
    //         <span>Total Weekly Classes:</span>
    //         <span>{totalWeeklySlots}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //     </>
    //   )}

    //   {editMode && <SlotConfiguration />}
    // </div>
  );
}

export default Attendance;
