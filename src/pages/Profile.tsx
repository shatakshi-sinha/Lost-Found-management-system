import React from 'react';
import { User, Settings, Bell, Shield, History } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Profile() {
  const { user } = useStore();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-sm font-medium text-indigo-600">{user.points} points</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">Member since Feb 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <History className="h-5 w-5 text-indigo-600" />
            <span>Recent Activity</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Found iPhone 13</p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
              <span className="text-green-600 font-medium">+500 pts</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Returned Laptop</p>
                <p className="text-sm text-gray-600">1 week ago</p>
              </div>
              <span className="text-green-600 font-medium">+1000 pts</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50">
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Account Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50">
              <Bell className="h-5 w-5 text-gray-600" />
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50">
              <Shield className="h-5 w-5 text-gray-600" />
              <span>Privacy & Security</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Statistics</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">15</p>
            <p className="text-gray-600">Items Found</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">12</p>
            <p className="text-gray-600">Items Returned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">98%</p>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}