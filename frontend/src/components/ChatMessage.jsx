import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slideIn`}>
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-500 ml-2' : 'bg-gray-200 mr-2'
          } transform transition-all duration-300 hover:scale-110`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-gray-700" />
          )}
        </div>
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