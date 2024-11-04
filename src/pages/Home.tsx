import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, MapPin, Calendar, Search, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Item } from '../types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [showReportForm, setShowReportForm] = useState(false);
  const { items, user, addItem } = useStore();
  const [newItem, setNewItem] = useState<Partial<Item>>({
    title: '',
    description: '',
    location: '',
    category: 'Electronics',
    status: 'lost',
    securityQuestions: [
      { question: '', answer: '' },
      { question: '', answer: '' }
    ]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const item: Item = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toISOString(),
      ...newItem as Omit<Item, 'id' | 'userId' | 'date'>
    };

    addItem(item);
    setShowReportForm(false);
    setNewItem({
      title: '',
      description: '',
      location: '',
      category: 'Electronics',
      status: 'lost',
      securityQuestions: [
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Lost & Found Items</h1>
          <p className="text-gray-600">Help reunite people with their belongings</p>
        </div>
        <button 
          onClick={() => setShowReportForm(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
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
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
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

      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Report an Item</h2>
                <button 
                  onClick={() => setShowReportForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={newItem.status}
                      onChange={(e) => setNewItem({ ...newItem, status: e.target.value as 'lost' | 'found' })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Documents">Documents</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="url"
                      value={newItem.imageUrl || ''}
                      onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Security Questions</label>
                    {newItem.securityQuestions?.map((q, index) => (
                      <div key={index} className="space-y-2">
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => {
                            const newQuestions = [...(newItem.securityQuestions || [])];
                            newQuestions[index] = { ...newQuestions[index], question: e.target.value };
                            setNewItem({ ...newItem, securityQuestions: newQuestions });
                          }}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Security Question"
                          required
                        />
                        <input
                          type="text"
                          value={q.answer}
                          onChange={(e) => {
                            const newQuestions = [...(newItem.securityQuestions || [])];
                            newQuestions[index] = { ...newQuestions[index], answer: e.target.value };
                            setNewItem({ ...newItem, securityQuestions: newQuestions });
                          }}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Answer"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
