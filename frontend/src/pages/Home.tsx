import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Ka Globe
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Modern task management for focused work
            </p>
          </div>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay organized with intuitive task tracking, due dates, and real-time updates. Built with modern web technologies for reliability and speed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Ka Globe?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Card className="p-6 border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600 text-sm">
                Each user keeps their tasks private. JWT authentication ensures secure access.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-green-600 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast & Responsive</h3>
              <p className="text-gray-600 text-sm">
                Real-time updates with optimistic UI rendering. No page reloads needed.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Developer Friendly</h3>
              <p className="text-gray-600 text-sm">
                Built with TypeScript, Prisma, and modern best practices for reliability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Ka Globe. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
