import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((response) => {
        const today = new Date();
        const upcoming = response.data.filter(event => new Date(event.date) >= today);
        const past = response.data.filter(event => new Date(event.date) < today);
        
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Upcoming Events */}
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      {/* Past Events */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Past Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No past events.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
