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
      image: './shweta.jpg', // Placeholder image URL
    },
      {
        id: 2,
        name: 'Vinod Patidar',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 3,
        name: 'Riddhi Limbachiya',
        subject: 'QR',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 4,
        name: 'Ayushi Desai',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 5,
        name: 'Neetesh Parashar',
        subject: 'MSWD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 6,
        name: 'Soumen Mukherjii',
        subject: 'MAD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 7,
        name: 'Vinod Patidar',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 8,
        name: 'Keya S Patel',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 9,
        name: 'Bhumi Shah',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 10,
        name: 'Arpita Meet Vaidya',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 11,
        name: 'Gaurav Kumar Ameta',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 12,
        name: 'Sweety Patel',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 13,
        name: 'Bisal Kumar Show',
        subject: 'MSWD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 14,
        name: 'Irfatnaz Shaikh',
        subject: 'ES',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 15,
        name: 'Sandip Suresh Hire',
        subject: 'IMP',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 16,
        name: 'Fedrick Mecwan',
        subject: 'ES',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 17,
        name: 'Rahul Prajapati',
        subject: 'QR',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 18,
        name: 'Maksud Vhora',
        subject: 'MSWD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 19,
        name: 'Akash Sayaji Ugalmugale',
        subject: 'MAD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 20,
        name: 'Bhumi Shah',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 21,
        name: 'Vaibhavi B Parikh',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 22,
        name: 'Meetkumar Manojkumar Patel',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 23,
        name: 'Jay Vadodariya',
        subject: 'QR',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 24,
        name: 'Dr. Dharna Bhatt',
        subject: 'ES',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 25,
        name: 'Narasimha Pillai',
        subject: 'IMP',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 26,
        name: 'Shivkumar Lihare',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 27,
        name: 'Mohitkumar Jagdishchandra Rathod',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 28,
        name: 'Shivangi Patel',
        subject: 'ML',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 29,
        name: 'Kapil Dev Raghuwanshi',
        subject: 'CD',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 30,
        name: 'Parthik Degama',
        subject: 'QR',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      },
      {
        id: 31,
        name: 'Sanket Gandhi',
        subject: 'ES',
        remark: 'Great at explaining complex concepts.',
        image: 'https://placehold.co/150',
      }
    
    
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