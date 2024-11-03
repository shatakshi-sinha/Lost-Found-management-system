import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, Shield, MapPin, Calendar, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function ItemDetails() {
  const { id } = useParams();
  const { items, user } = useStore();
  const item = items.find((i) => i.id === id);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!item) return <div>Item not found</div>;

  const handleClaim = () => {
    const allCorrect = answers.every(
      (answer, index) =>
        answer.toLowerCase() ===
        item.securityQuestions[index].answer.toLowerCase()
    );

    if (allCorrect) {
      toast.success(
        'Claim successful! Please check your messages to coordinate pickup.'
      );
    } else {
      toast.error('Incorrect answers. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {item.imageUrl && (
          <div className="md:flex-shrink-0">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-96 w-full object-cover md:w-96"
            />
          </div>
        )}
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  item.status === 'lost'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {item.title}
              </h2>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <p className="text-gray-600">{item.description}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Posted by User#{item.userId.slice(0, 8)}</span>
              </div>
            </div>

            {user && user.id !== item.userId && (
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowClaimForm(true)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  <Shield className="h-5 w-5" />
                  <span>Claim Item</span>
                </button>
                <button className="flex items-center space-x-2 border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50">
                  <MessageCircle className="h-5 w-5" />
                  <span>Message</span>
                </button>
              </div>
            )}
          </div>

          {showClaimForm && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Security Questions</h3>
              <div className="space-y-4">
                {item.securityQuestions.map((q, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">
                      {q.question}
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={handleClaim}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Submit Claim
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
