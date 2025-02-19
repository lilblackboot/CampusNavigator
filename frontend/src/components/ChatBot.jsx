import React, { useState, useRef, useEffect } from 'react';
import { Bot, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { Card, CardTitle, CardContent } from "./ui/card";
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateResponse } from '../services/gemini';
import rawTimetableData from '../data/timetable.json';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hi! How can I help you with your timetable today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const timetableData = Array.isArray(rawTimetableData) ? rawTimetableData : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please upload an image smaller than 5MB.');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQuestion = async (question) => {
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: question,
        timestamp: new Date().toLocaleTimeString()
      }]);

      const response = await generateResponse(question, timetableData, selectedImage);
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }]);

      if (selectedImage) {
        removeImage();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "I couldn't process that request. Could you try asking differently?",
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full  mx-auto h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
      <CardContent className="flex-1 flex flex-col p-4">
        <div 
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 scroll-smooth"
        >
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {imagePreview && (
          <div className="relative mb-4 inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-32 rounded-lg shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full 
                       hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex gap-2 sticky bottom-0 bg-white p-4 border-t border-gray-200">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 text-gray-500 hover:text-gray-700 transition-colors
                     bg-gray-100 rounded-lg hover:bg-gray-200"
            title="Upload image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <ChatInput 
            onSend={handleQuestion} 
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Add custom animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }

  /* Custom scrollbar */
  .scroll-smooth {
    scrollbar-width: thin;
    scrollbar-color: #CBD5E0 #EDF2F7;
  }

  .scroll-smooth::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-smooth::-webkit-scrollbar-track {
    background: #EDF2F7;
  }

  .scroll-smooth::-webkit-scrollbar-thumb {
    background: #CBD5E0;
    border-radius: 3px;
  }

  .scroll-smooth::-webkit-scrollbar-thumb:hover {
    background: #A0AEC0;
  }
`;
document.head.appendChild(style);

export default ChatBot;
