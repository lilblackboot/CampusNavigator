import React from 'react';

function Attendance() {
  const currentAttendance = 85; // Example percentage
  const classesAttended = 34; // Example number of classes attended
  const totalClasses = 40; // Example total number of classes held

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-black flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Attendance Manager</h2>
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
    </div>
  );
}

export default Attendance;