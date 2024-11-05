import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Trophy, User, LogOut, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import debounce from 'lodash/debounce';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, searchQuery, setSearchQuery } = useStore();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    }, 300),
    [navigate]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">FindIt</span>
          </Link>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search lost items..."
                defaultValue={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/leaderboard" className="text-gray-600 hover:text-indigo-600">
              <Trophy className="h-6 w-6" />
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium">{user.points} pts</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => useStore.getState().login('demo@example.com', 'demo123')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
