import React, { useState, useEffect } from "react";
import axios from "axios";

const EventForm = ({ selectedEvent, setSelectedEvent, fetchEvents }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
    imagePreview: null, // Handles image preview
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        date: selectedEvent.date.substring(0, 10), // Format date for input
        time: selectedEvent.time,
        location: selectedEvent.location,
        description: selectedEvent.description,
        image: null,
        imagePreview: selectedEvent.imageUrl
          ? `http://localhost:5000${selectedEvent.imageUrl}`
          : null, // Ensure correct image path
      });
    } else {
      resetForm();
    }
  }, [selectedEvent]);

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file), // Show new image preview
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const eventData = new FormData();
      eventData.append("title", formData.title);
      eventData.append("date", formData.date);
      eventData.append("time", formData.time);
      eventData.append("location", formData.location);
      eventData.append("description", formData.description);

      if (formData.image) {
        eventData.append("image", formData.image);
      }

      if (selectedEvent) {
        // Update existing event
        await axios.put(`/api/events/${selectedEvent._id}`, eventData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage({ text: "Event updated successfully!", type: "success" });
      } else {
        // Create new event
        await axios.post("/api/events", eventData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage({ text: "Event created successfully!", type: "success" });
        resetForm();
      }

      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error submitting event:", error);
      setMessage({
        text: "Error submitting event. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {selectedEvent ? "Edit Event" : "Create New Event"}
      </h2>

      {message.text && (
        <div
          className={`p-3 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            name="title"
            type="text"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            name="date"
            type="date"
            className="w-full p-2 border rounded"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Time</label>
          <input
            name="time"
            type="time"
            className="w-full p-2 border rounded"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            name="location"
            type="text"
            className="w-full p-2 border rounded"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded h-32"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Event Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
          />
          {formData.imagePreview && (
            <div className="mt-2">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="h-40 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : selectedEvent
              ? "Update Event"
              : "Create Event"}
          </button>

          {selectedEvent && (
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
