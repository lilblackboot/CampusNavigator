import React, { useState } from 'react';

function StarTeachers() {
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Shweta Gupta',
      subject: 'Compiler Design',
      remark: 'Excellent problem-solving skills.',
      image: '', // Placeholder image URL
    },
    {
      id: 2,
      name: 'Jane Smith',
      subject: 'Physics',
      remark: 'Great at explaining complex concepts.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      subject: 'Chemistry',
      remark: 'Very thorough and detailed.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Bob Brown',
      subject: 'Biology',
      remark: 'Passionate about the subject.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Charlie Davis',
      subject: 'English',
      remark: 'Encourages creative thinking.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Diana Evans',
      subject: 'History',
      remark: 'Makes history come alive.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      name: 'Ethan Green',
      subject: 'Geography',
      remark: 'Very knowledgeable.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      name: 'Fiona Harris',
      subject: 'Computer Science',
      remark: 'Great at coding.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      name: 'George Clark',
      subject: 'Art',
      remark: 'Inspires creativity.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 10,
      name: 'Hannah Lewis',
      subject: 'Music',
      remark: 'Talented and patient.',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    const filteredTeachers = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTeachers(filteredTeachers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Star Teachers</h1>

      {/* Image Upload Section */}
      <div className="mb-8 text-center">
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="mb-4"
        />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          />
        )}
      </div>

      {/* Search Section */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Teacher Image */}
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
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