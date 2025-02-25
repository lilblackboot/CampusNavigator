
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Attendance() {
  const { user } = useUser();
  const [currentAttendance, setCurrentAttendance] = useState(85);
  const [classesAttended, setClassesAttended] = useState(34);
  const [totalClasses, setTotalClasses] = useState(40);
  
  // New state variables for attendance calculator
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
    sunday: 0
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

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
      const possibleBunks = Math.floor(attendedSlots - (targetAttendance * totalSlots) / 100);
      setCalculationResult({
        type: 'positive',
        percentage: currentPercentage.toFixed(2),
        classes: possibleBunks
      });
    } else {
      // Calculate how many classes need to be attended to reach target attendance
      // Formula: ((target * total)/100 - attended) = classes needed to attend
      const requiredClasses = Math.ceil((targetAttendance * totalSlots) / 100 - attendedSlots);
      setCalculationResult({
        type: 'negative',
        percentage: currentPercentage.toFixed(2),
        classes: requiredClasses
      });
    }
  };

  useEffect(() => {
    if (user) {
      // Check for valid MongoDB ObjectId
      if (!user.id || typeof user.id !== 'string' || user.id.length !== 24) {
        setError('Invalid user ID format. Please log out and log in again.');
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
      console.log('No valid user ID available');
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
      console.error('Error fetching slots:', error);
      // Show form for 404 (first time users) but show error for other status codes
      if (error.response?.status === 404) {
        setShowSlotForm(true);
      } else {
        setError('Failed to load your schedule. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSlotChange = (day, value) => {
    setSlots(prevSlots => ({
      ...prevSlots,
      [day]: parseInt(value) || 0
    }));
  };

  const saveSlots = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
      setError('User ID not found. Please try logging out and logging in again.');
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
      
      const totalSlots = Object.values(slots).reduce((sum, count) => sum + count, 0);
      if (totalSlots === 0) {
        setError('Please add at least one class slot before saving.');
        setLoading(false);
        return;
      }
  
      // Using the proxy - no need for full URL
      const response = await axios.post('/api/slots', {
        userId: user.id,
        slots
      });
  
      if (response.data) {
        setShowSlotForm(false);
        setEditMode(false);
        setError(null);
      }
    } catch (error) {
      console.error('Error saving slots:', error);
      setError(
        error.response?.data?.message || 
        'Failed to save your schedule. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  // (Previous component code continues with UI rendering)
  const totalWeeklySlots = Object.values(slots).reduce((sum, value) => sum + value, 0);

  const SlotConfiguration = () => (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl my-8">
      <h3 className="text-2xl font-semibold mb-4">
        {editMode ? 'Edit Your Weekly Class Schedule' : 'Configure Your Weekly Class Schedule'}
      </h3>
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
          {Object.keys(slots).map(day => (
            <div key={day} className="flex items-center">
              <label className="w-32 capitalize">{day}:</label>
              <input
                type="number"
                min="0"
                max="12"
                value={slots[day]}
                onChange={(e) => handleSlotChange(day, e.target.value)}
                className="ml-2 p-2 border rounded w-20 text-center"
              />
              <span className="ml-2">slots</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="font-medium">Total weekly slots: <span className="text-blue-600">{totalWeeklySlots}</span></p>
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Schedule'}
            </button>
          </div>
        </div>
      </form>
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
  const AttendanceCalculator = () => (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl my-8">
      <h3 className="text-2xl font-semibold mb-4">Attendance Calculator</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
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
              onChange={(e) => setAttendedSlots(parseInt(e.target.value) || 0)}
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
              onChange={(e) => setTargetAttendance(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <button
          onClick={calculateAttendance}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        {calculationResult && (
          <div className={`mt-4 p-4 rounded ${
            calculationResult.type === 'positive' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <p className="text-lg mb-2">
              Current Attendance: {calculationResult.percentage}%
            </p>
            {calculationResult.type === 'positive' ? (
              <p className="text-green-700">
                You can safely miss {calculationResult.classes} more {calculationResult.classes === 1 ? 'class ' : 'classes '} 
                 while maintaining {targetAttendance}% attendance.
              </p>
            ) : (
              <p className="text-yellow-700">
                You need to attend {calculationResult.classes} more {calculationResult.classes === 1 ? 'class ' : 'classes '}  
                to reach {targetAttendance}% attendance.
              </p>
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
    <div className="min-h-screen p-8 bg-gray-100 text-black flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Attendance Manager</h2>
            <AttendanceCalculator />
      {showSlotForm ? (
        <SlotConfiguration />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Current Attendance</h3>
              <p className="text-5xl font-bold text-green-500">{currentAttendance}%</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Classes Attended</h3>
              <p className="text-5xl font-bold text-blue-500">{classesAttended}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Total Classes</h3>
              <p className="text-5xl font-bold text-red-500">{totalClasses}</p>
            </div>
          </div>
          
          <div className="mt-10 w-full max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Weekly Class Schedule</h3>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Edit Schedule
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(slots).map(([day, count]) => (
                  <div key={day} className="flex justify-between border-b pb-2">
                    <span className="capitalize font-medium">{day}:</span>
                    <span>{count} {count === 1 ? 'class' : 'classes'}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-blue-600 md:col-span-2 mt-2 pt-2 border-t">
                  <span>Total Weekly Classes:</span>
                  <span>{totalWeeklySlots}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {editMode && <SlotConfiguration />}
    </div>
  );
}

export default Attendance;