import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
const EventCard = ({ event }) => {
  return (
    <div className=" p-6 rounded-lg  shadow-lg bg-white" >
      {event.imageUrl && (
        <img
          src={`http://localhost:5000${event.imageUrl}`}
          alt={event.title}
          className="w-full h-50 object-cover rounded-md"
        />
      )}
    <div className="flex justify-between items-center"> <div> <h2 className="text-xl font-bold mt-2">{event.title}</h2>
     <p className="text-gray-600">{new Date(event.date).toDateString()}</p></div>
      <Link
        to={`/event/${event._id}`}
        className="mt-3 block  text-center hover:bg-black hover:text-white text-black  py-2 px-4 rounded-full bg-white  transition"
      >
        <ChevronRight/>
      </Link></div>
    </div>
  );
};

export default EventCard;
