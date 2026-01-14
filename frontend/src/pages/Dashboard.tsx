import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
  dueDate: z.string().optional(),
})

type Task = {
  id: string
  title: string
  description?: string | null
  completed: boolean
  dueDate?: string | null
}

type FormData = z.infer<typeof schema>

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { register, handleSubmit, reset, formState } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const res = await api.get('/api/tasks')
      setTasks(res.data)
    } catch (e: any) {
      console.error('Failed to fetch tasks', e)
    }
  }

  async function onSubmit(data: FormData) {
    try {
      const res = await api.post('/api/tasks', data)
      setTasks((s) => [res.data, ...s])
      reset()
    } catch (e: any) {
      alert(e?.response?.data?.error || 'Failed to create task')
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this task?')) return
    try {
      await api.delete(`/api/tasks/${id}`)
      setTasks((s) => s.filter((t) => t.id !== id))
    } catch (e) {
      alert('Failed to delete')
    }
  }

  async function onToggleComplete(task: Task) {
    try {
      const res = await api.put(`/api/tasks/${task.id}`, { ...task, completed: !task.completed })
      setTasks((s) => s.map((t) => (t.id === task.id ? res.data : t)))
    } catch (e) {
      alert('Failed to update')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <div>
          <input {...register('title')} placeholder="Title" className="w-full border px-3 py-2 rounded" />
          {formState.errors.title && <p className="text-sm text-red-600">{formState.errors.title.message}</p>}
        </div>
        <div>
          <input {...register('description')} placeholder="Description" className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex gap-2">
          <input {...register('dueDate')} type="date" className="border px-3 py-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </div>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 && <p>No tasks yet</p>}
        {tasks.map((task) => (
          <div key={task.id} className="p-3 border rounded flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(task)} />
                <div>
                  <div className="font-medium">{task.title}</div>
                  {task.description && <div className="text-sm text-gray-600">{task.description}</div>}
                  {task.dueDate && <div className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onDelete(task.id)} className="text-sm text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
