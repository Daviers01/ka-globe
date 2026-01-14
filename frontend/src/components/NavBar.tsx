/**
 * Navigation bar component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Globe_Telecom_logo.svg"
              alt="Globe Logo"
              className="w-20 h-20 object-contain drop-shadow-md transition-transform group-hover:scale-110"
            />
           
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/tasks"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                Tasks
              </Link>
            )}

            <div className="flex gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Register</Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={onLogout} className="hover:bg-red-50 hover:text-red-600 hover:border-red-300">
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
