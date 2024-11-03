import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Leaderboard() {
  const { user } = useStore();

  // Simulated leaderboard data
  const leaderboardData = [
    { id: '1', name: 'Sarah Johnson', points: 2500, items: 15 },
    { id: '2', name: 'Michael Chen', points: 2100, items: 12 },
    { id: '3', name: 'Emma Davis', points: 1800, items: 10 },
    // Add more users...
  ];

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Community Leaders</h1>
        <p className="text-gray-600">
          Top contributors helping reunite lost items with their owners
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-4 text-gray-600">Rank</th>
                <th className="pb-4 text-gray-600">User</th>
                <th className="pb-4 text-gray-600 text-right">Items Helped</th>
                <th className="pb-4 text-gray-600 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((leader, index) => (
                <tr
                  key={leader.id}
                  className={`border-b last:border-0 ${
                    leader.id === user?.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <td className="py-4 flex items-center space-x-2">
                    <span className="font-semibold">#{index + 1}</span>
                    {getRankIcon(index)}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {leader.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{leader.name}</p>
                        <p className="text-sm text-gray-500">Member since 2024</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">{leader.items}</td>
                  <td className="py-4 text-right font-semibold text-indigo-600">
                    {leader.points.toLocaleString()} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{user.points}</p>
              <p className="text-gray-600">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">12</p>
              <p className="text-gray-600">Items Found</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">8</p>
              <p className="text-gray-600">Items Returned</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}