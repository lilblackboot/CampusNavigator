import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './EventForm';
import EventsList from './EventsList';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <EventForm
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            fetchEvents={fetchEvents}
          />
        </div>
        <div className="md:col-span-2">
          <EventsList
            events={events}
            loading={loading}
            onEditEvent={handleEditEvent}
            fetchEvents={fetchEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;