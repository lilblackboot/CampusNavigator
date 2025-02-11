import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slideIn`}>
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
        <div 
          className={`rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content}
          {message.timestamp && (
            <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {message.timestamp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
1