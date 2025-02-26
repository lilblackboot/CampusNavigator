import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function FindMyFood() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newPost, setNewPost] = useState({
    region: '',
    shop: '',
    food: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all food posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/food-posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load food posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.id) {
      alert('Please log in to create a post');
      return;
    }

    if (!imageFile) {
      alert('Please select an image for your food post');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create FormData object to send file and post data
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('userId', user.id);
      formData.append('region', newPost.region);
      formData.append('shop', newPost.shop);
      formData.append('food', newPost.food);
      formData.append('description', newPost.description);
      
      const response = await axios.post('http://localhost:5000/api/food-posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Add the new post to the state
      setPosts([response.data, ...posts]);
      
      // Reset form
      setNewPost({ region: '', shop: '', food: '', description: '' });
      setImageFile(null);
      setPreviewImage(null);
      setShowForm(false);
      
      alert('Food post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Find My Food</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full md:w-auto"
          >
            {showForm ? 'Close Form' : 'Make a Post'}
          </button>
        </div>
      </div>

      {/* Form for creating a new food post */}
      {showForm && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Share Your Food Experience</h2>
          
          {!user ? (
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <p className="text-yellow-700">Please log in to create a post.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Campus Region</label>
                <input
                  type="text"
                  name="region"
                  placeholder="e.g., North Campus, South Campus"
                  value={newPost.region}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Shop/Restaurant Name</label>
                <input
                  type="text"
                  name="shop"
                  placeholder="e.g., Cafe Coffee Day, Campus Canteen"
                  value={newPost.shop}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Food Item</label>
                <input
                  type="text"
                  name="food"
                  placeholder="e.g., Pizza, Burger, Dosa"
                  value={newPost.food}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Upload Food Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {previewImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                    <img 
                      src={previewImage} 
                      alt="Food preview" 
                      className="h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Tell us about this food item - taste, price, recommendations..."
                  value={newPost.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } transition duration-300`}
              >
                {isSubmitting ? 'Posting...' : 'Post Food Item'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Food Posts Display */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Campus Food Discoveries</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading food posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No food posts found. Be the first to share!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-102 hover:shadow-lg"
                onClick={() => handleImageClick(post)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`http://localhost:5000${post.imageUrl}`}
                    alt={post.food}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Food+Image+Not+Available';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{post.food}</h3>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Shop:</span> {post.shop}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Region:</span> {post.region}
                  </p>
                  <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    Posted by: {post.userEmail.split('@')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing food post details */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{selectedPost.food}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              
              <img
                src={`http://localhost:5000${selectedPost.imageUrl}`}
                alt={selectedPost.food}
                className="w-full h-64 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Food+Image+Not+Available';
                }}
              />
              
              <div className="h-64 w-full mb-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6960402601094!2d73.36242097618985!3d22.28950114328503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fdb01ce1797f9%3A0xaa8b442e4fc91e5f!2sSubway%20Parul%20University!5e0!3m2!1sen!2sin!4v1739620877588!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium">Shop:</span> {selectedPost.shop}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Region:</span> {selectedPost.region}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Posted by: {selectedPost.userEmail.split('@')[0]}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Description:</p>
                  <p className="text-gray-600">{selectedPost.description}</p>
                </div>
              </div>
              
              {user && selectedPost.userId === user.id && (
                <div className="mt-4 text-right">
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this post?')) {
                        try {
                          await axios.delete(`http://localhost:5000/api/food-posts/${selectedPost._id}`, {
                            data: { userId: user.id }
                          });
                          setPosts(posts.filter(post => post._id !== selectedPost._id));
                          closeModal();
                          alert('Post deleted successfully');
                        } catch (err) {
                          console.error('Error deleting post:', err);
                          alert('Failed to delete post');
                        }
                      }
                    }}
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindMyFood;