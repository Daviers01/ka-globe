import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Ka Globe — Task management</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Track tasks, set due dates, and keep your work organized. Built with React, TypeScript, and Prisma.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/register">
            <Button variant="default">Get started</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Per-user tasks</h3>
            <p className="text-sm text-muted-foreground">Each user keeps their tasks private and secure.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Simple APIs</h3>
            <p className="text-sm text-muted-foreground">REST endpoints for auth and task CRUD with JWT auth.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Built for devs</h3>
            <p className="text-sm text-muted-foreground">TypeScript, Prisma, Docker-ready and testable.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
