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
    // <div className="fixed inset-0 flex items-center justify-center  z-50">
    //   <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full relative">
    //     {/* Close Button */}
    //     <button
    //       onClick={() => navigate(-1)}
    //       className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
    //     >
    //       <X className="w-6 h-6" />
    //     </button>

    //     {/* Event Image */}
    //     {event.imageUrl && (
    //       <img
    //         src={`http://localhost:5000${event.imageUrl}`}
    //         alt={event.title}
    //         className="w-full h-48 object-cover rounded-lg mb-4"
    //       />
    //     )}

    //     {/* Event Details */}
    //     <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>
    //     <p className="text-gray-500">{new Date(event.date).toDateString()} at {event.time}</p>
    //     <p className="mt-4 text-gray-700">{event.description}</p>
    //     <p className="mt-2 font-bold text-gray-800">📍 Location: {event.location}</p>

    //   </div>
    // </div>

<div className="grid grid-cols-2">

  <div id="img" className="h-full" 
  // style={{backgroundImage:`url('http://localhost:5000${event.imageUrl}')`}}
  >
     <img
            src={`http://localhost:5000${event.imageUrl}`}
            alt={event.title}
          className="w-full object-cover min-h-screen"
        />
  </div>
  <div id="content" className="h-full m-15">

<div className="header ">
<button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>
  <div className="font-serif font-bold text-7xl mb-6 border-b-gray-200 border-b-2  pb-10">{event.title}</div>
  <div className="flex gap-25 mt-15">
    <div className=""><p className="font-semibold ">Time</p><p className="text-gray-400">{new Date(event.date).toDateString()} </p><p  className="text-gray-400"> {event.time}</p></div>
    <div><p className="font-semibold">Venue</p><p className="text-gray-400">{event.location}</p></div>
    
  </div>
  <button className="mt-10 bg-blue-400 px-5 py-2 rounded-lg w-full font-semibold text-white hover:bg-blue-500 ">Register</button>
</div>
<div className="main text-gray-700 mt-15">
  {event.description}
</div>

  </div>
</div>


  );
};

export default EventDetails;
