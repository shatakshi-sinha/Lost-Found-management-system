import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, MapPin, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const { items } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Lost & Found Items</h1>
          <p className="text-gray-600">Help reunite people with their belongings</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <PlusCircle className="h-5 w-5" />
          <span>Report Item</span>
        </button>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('lost')}
          className={`pb-4 px-4 ${
            activeTab === 'lost'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500'
          }`}
        >
          Lost Items
        </button>
        <button
          onClick={() => setActiveTab('found')}
          className={`pb-4 px-4 ${
            activeTab === 'found'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500'
          }`}
        >
          Found Items
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items
          .filter((item) => item.status === activeTab)
          .map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}