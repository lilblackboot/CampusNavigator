import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Events from "../components/Events"
import { X } from "lucide-react"; // Close Icon

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error("Error fetching event", err));
  }, [id]);

  if (!event) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Event Image */}
        {event.imageUrl && (
          <img
            src={`http://localhost:5000${event.imageUrl}`}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        {/* Event Details */}
        <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>
        <p className="text-gray-500">{new Date(event.date).toDateString()} at {event.time}</p>
        <p className="mt-4 text-gray-700">{event.description}</p>
        <p className="mt-2 font-bold text-gray-800">📍 Location: {event.location}</p>

        {/* Close Button at Bottom */}
        <button
          onClick={() => <Events />}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
