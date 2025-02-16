import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons

function FindMyFood() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      region: 'North Campus',
      shop: 'Cafe A',
      food: 'Pizza',
      image: 'https://imgs.search.brave.com/cv7XNjhjEQ3L4KzkQspXNNrvA08nIV9QVpLjaAXmSD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/MzAwODUwNS9waG90/by9waXp6YS1oaWdo/LWFuZ2xlLXZpZXct/b2YtcGl6emEtb24t/dGFibGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTNWMUpW/UlRBQzJ2NC1HM1ZF/TU82ekNSQnBQTlVi/dlcxY1dJZnFnN200/M009',
      description: 'Delicious cheesy pizza with a variety of toppings.',
      location: { lat: 28.7041, lng: 77.1025 }, // Example coordinates for North Campus
    },
    {
      id: 2,
      region: 'South Campus',
      shop: 'Cafe B',
      food: 'Burger',
      image: 'https://imgs.search.brave.com/qyyr0MaYpN7C90MoQY1xcobgnVlLg7sCW2O8g4Nsr7s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE3/MzY0NTU0L3Bob3Rv/L2hhbWJ1cmdlci13/aXRoLWZyaWVzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/OGZNSVJld05GUlU3/WVNNTldJeDJheG95/Wk5qc2gwY3hITTR2/WU1BTGY4PQ',
      description: 'Juicy beef burger with fresh lettuce and tomatoes.',
      location: { lat: 28.5641, lng: 77.2025 }, // Example coordinates for South Campus
    },
    {
      id: 3,
      region: 'East Campus',
      shop: 'Cafe C',
      food: 'Pasta',
      image: 'https://imgs.search.brave.com/RwgSvzq2deN2ObQeEG5XGo8gs4Ye5nvA_SFhGqFzFUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjU1/NTc5NDg2L3Bob3Rv/L3Bhc3RhLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz13RFZh/VU0zMl9QYXF1em5K/QUlsM3JYNFp4Q0tT/YldHQ1JvcDFhc3U2/M2NrPQ',
      description: 'Creamy pasta with a rich tomato and basil sauce.',
      location: { lat: 28.6041, lng: 77.3025 }, // Example coordinates for East Campus
    },
    {
      id: 4,
      region: 'West Campus',
      shop: 'Cafe D',
      food: 'Sushi',
      image: 'https://imgs.search.brave.com/L0WAnEZTmY6FBbOyQv-EiWqaLFwpdRON7IgNoqmmNKg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzQ2Lzg1LzE4/LzM2MF9GXzQ2ODUx/ODU2X2xmWHFwQWxP/MDd5ZEU4MmVGaVI0/WXQwUjZoZGdNQUJ4/LmpwZw',
      description: 'Fresh sushi rolls with a mix of fish and vegetables.',
      location: { lat: 28.6541, lng: 77.4025 }, // Example coordinates for West Campus
    },
    // Add more posts as needed
  ]);

  const [newPost, setNewPost] = useState({
    region: '',
    shop: '',
    food: '',
    image: '',
    description: '',
    location: { lat: 0, lng: 0 }, // Default location
  });

  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search term
  const [selectedPost, setSelectedPost] = useState(null); // State to manage selected post for modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { ...newPost, id: posts.length + 1 };
    setPosts([...posts, post]);
    setNewPost({ region: '', shop: '', food: '', image: '', description: '', location: { lat: 0, lng: 0 } });
    setShowForm(false); // Hide the form after submission
  };

  const filteredPosts = posts.filter((post) =>
    post.food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (post) => {
    setSelectedPost(post); // Set the selected post to show in the modal
  };

  const closeModal = () => {
    setSelectedPost(null); // Close the modal
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Find My Food</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {showForm ? 'Close Form' : 'Make a Post'}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Submit a New Food Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={newPost.region}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="shop"
              placeholder="Shop Name"
              value={newPost.shop}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="food"
              placeholder="Food Item"
              value={newPost.food}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL (e.g., from Unsplash)"
              value={newPost.image}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newPost.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Food Posts */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Food Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(post)}
            >
              <img
                src={post.image}
                alt={post.food}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400'; // Fallback image
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{post.food}</h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Shop:</span> {post.shop}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Region:</span> {post.region}
                </p>
                <p className="text-gray-600 mt-2">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Image and Map */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{selectedPost.food}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <img
                src={selectedPost.image}
                alt={selectedPost.food}
                className="w-full h-64 object-cover mb-4"
              />
              <div className="h-64 w-full">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6960402601094!2d73.36242097618985!3d22.28950114328503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fdb01ce1797f9%3A0xaa8b442e4fc91e5f!2sSubway%20Parul%20University!5e0!3m2!1sen!2sin!4v1739620877588!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <p className="text-gray-600 mt-4">
                <span className="font-medium">Shop:</span> {selectedPost.shop}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Region:</span> {selectedPost.region}
              </p>
              <p className="text-gray-600 mt-2">{selectedPost.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindMyFood;