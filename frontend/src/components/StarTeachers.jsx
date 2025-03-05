import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StarTeachers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch teachers from the API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/teachers');
        setTeachers(response.data);
        setFilteredTeachers(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch teachers data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredTeachers(teachers);
      return;
    }

    const filtered = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  // Reset search
  const handleReset = () => {
    setSearchQuery('');
    setFilteredTeachers(teachers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Star Teachers</h1>

      {/* Search Section */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-4xl mx-auto">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-600 text-xl my-12">
          Loading teachers...
        </div>
      )}

      {/* No Results */}
      {!loading && filteredTeachers.length === 0 && (
        <div className="text-center text-gray-600 text-xl my-12">
          No teachers found matching your search.
        </div>
      )}

      {/* Teachers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Teacher Image */}
            <img
              src={teacher.imageUrl.startsWith("http") ? teacher.imageUrl : `http://localhost:5000${teacher.imageUrl}`}
              alt={teacher.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/150';
              }}
            />
            <h2 className="text-xl font-semibold mb-2">{teacher.name}</h2>
            <p className="text-gray-600 mb-1">
              <strong>Subject:</strong> {teacher.subject}
            </p>
            <p className="text-gray-600">
              <strong>Remark:</strong> {teacher.remark}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StarTeachers;