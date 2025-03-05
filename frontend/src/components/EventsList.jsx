import React from "react";
import axios from "axios";

const EventsList = ({ events, loading, onEditEvent, fetchEvents }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/api/events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading events...</div>;
  }

  if (events.length === 0) {
    return <div className="bg-white p-6 rounded-lg shadow-md">No events found. Create one to get started!</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Events List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl.startsWith("http") ? event.imageUrl : `http://localhost:5000${event.imageUrl}`}
                      alt={event.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/64")}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      No image
                    </div>
                  )}
                </td>
                <td className="p-2">{event.title}</td>
                <td className="p-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-2">{event.location}</td>
                <td className="p-2">
                  <button
                    onClick={() => onEditEvent(event)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsList;
