import React from 'react';
import { useEffect } from 'react';

const posts = [
  { id: 1, imageUrl: './jinesh.jpg', caption: 'Jignesh Kaviraj at parul University for Projection 2025' },
  { id: 2, imageUrl:  './badsha.jpg', caption: 'Badshah at Parul University for Projection 2025' },
  { id: 3, imageUrl: './sunidhi.jpg', caption: 'Sunidhi at Parul University for Projection 2025' },
  { id: 4, imageUrl: './mostlysane.jpg', caption: 'Mostlysane in Parul univrsity' },
  { id: 5, imageUrl: './zakir.jpg', caption: 'Zakir khan in Parul unversity' },
  { id: 6, imageUrl: './arjun.jpg', caption: 'Arjun kapoor at Parul University' },
];


function Events() {useEffect(() => {
  // Load Instagram's embed script
  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">


        
      <h1 className="text-3xl font-bold text-center mb-8">Events</h1>
      <div className="flex justify-center p-4">
      <blockquote
        className="instagram-media rounded-lg shadow-lg max-w-md sm:max-w-lg w-full border border-gray-200"
        data-instgrm-permalink="https://www.instagram.com/p/DGFUAb0teyU/"
        data-instgrm-version="14"
      ></blockquote>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={post.imageUrl} alt={post.caption} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-gray-700">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;