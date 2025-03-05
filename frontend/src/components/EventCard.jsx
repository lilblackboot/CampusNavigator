import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white" >
      {event.imageUrl && (
        <img
          src={`http://localhost:5000${event.imageUrl}`}
          alt={event.title}
          className="w-full h-50 object-cover rounded-md"
        />
      )}
      <h2 className="text-xl font-bold mt-2">{event.title}</h2>
      <p className="text-gray-600">{new Date(event.date).toDateString()}</p>
      <Link
        to={`/event/${event._id}`}
        className="mt-3 block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
