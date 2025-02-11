import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your timetable..."
        className="flex-1 p-4 rounded-lg border-2 focus:outline-none focus:border-blue-500 
                   transition-all duration-300 bg-white/80 backdrop-blur-sm"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                   transform hover:scale-105 active:scale-95"
        disabled={isLoading || !input.trim()}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;