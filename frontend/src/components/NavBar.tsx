/**
 * Navigation bar component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, onLogout }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Globe_Telecom_logo.svg"
              alt="Globe Logo"
              className="w-20 h-20 object-contain drop-shadow-md transition-transform group-hover:scale-110 dark:brightness-110"
            />
           
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link
                to="/tasks"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all"
              >
                Tasks
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600 dark:text-gray-400" />}
            </button>

            <div className="flex gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-gray-800 dark:text-gray-200">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Register</Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={onLogout} className="hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 dark:text-gray-200 dark:border-gray-600">
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
