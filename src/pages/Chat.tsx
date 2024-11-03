import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Chat() {
  const { itemId } = useParams();
  const { messages, user, addMessage } = useStore();
  const [newMessage, setNewMessage] = useState('');

  const itemMessages = messages.filter((m) => m.itemId === itemId);

  const handleSend = () => {
    if (!user || !newMessage.trim()) return;

    addMessage({
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: 'other-user-id', // In a real app, this would be the item owner's ID
      content: newMessage,
      timestamp: new Date().toISOString(),
      itemId: itemId!,
    });

    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-12rem)]">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {itemMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.senderId === user?.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
