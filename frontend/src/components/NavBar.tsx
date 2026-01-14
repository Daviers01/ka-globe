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
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span className="inline-block w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
              KG
            </span>
            Ka Globe
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/tasks"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Tasks
              </Link>
            )}

            <div className="flex gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={onLogout}>
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
