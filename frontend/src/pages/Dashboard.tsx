import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import Modal from '@/components/ui/modal'

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
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState<boolean>(false)
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
      setCreating(false)
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
      const res = await api.put(`/api/tasks/${task.id}`, { title: task.title, description: task.description, dueDate: task.dueDate, completed: !task.completed })
      setTasks((s) => s.map((t) => (t.id === task.id ? res.data : t)))
    } catch (e) {
      alert('Failed to update')
    }
  }

  async function startEdit(task: Task) {
    setEditingId(task.id)
  }

  async function cancelEdit() {
    setEditingId(null)
  }

  async function submitEdit(id: string, values: FormData) {
    try {
      const res = await api.put(`/api/tasks/${id}`, values)
      setTasks((s) => s.map((t) => (t.id === id ? res.data : t)))
      setEditingId(null)
    } catch (e) {
      alert('Failed to update task')
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="text-lg font-bold">{tasks.length}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Completed</div>
          <div className="text-lg font-bold">{tasks.filter((t) => t.completed).length}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Pending</div>
          <div className="text-lg font-bold">{tasks.filter((t) => !t.completed).length}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Overdue</div>
          <div className="text-lg font-bold">{tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div />
        <div>
          <Button onClick={() => setCreating(true)}>New Task</Button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 && <p>No tasks yet</p>}
        {tasks.map((task) => (
          <Card key={task.id} className="p-3 flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(task)} />
                <div>
                  {editingId === task.id ? (
                    <EditForm task={task} onCancel={cancelEdit} onSave={submitEdit} />
                  ) : (
                    <>
                      <div className="font-medium">{task.title}</div>
                      {task.description && <div className="text-sm text-gray-600">{task.description}</div>}
                      {task.dueDate && <div className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {editingId !== task.id ? (
                <>
                  <button onClick={() => startEdit(task)} className="text-sm text-blue-600">Edit</button>
                  <button onClick={() => onDelete(task.id)} className="text-sm text-red-600">Delete</button>
                </>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      {/* Create modal */}
      <Modal open={creating} onClose={() => setCreating(false)} title="Create Task">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label>Title</Label>
            <Input {...register('title')} />
            {formState.errors.title && <p className="text-sm text-red-600">{formState.errors.title.message}</p>}
          </div>
          <div>
            <Label>Description</Label>
            <Input {...register('description')} />
          </div>
          <div className="flex gap-2">
            <Input {...register('dueDate')} type="date" />
            <Button type="submit">Create</Button>
            <Button variant="outline" type="button" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function EditForm({ task, onCancel, onSave }: { task: Task; onCancel: () => void; onSave: (id: string, data: FormData) => void }) {
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { title: task.title, description: task.description ?? undefined, dueDate: task.dueDate ? task.dueDate.split('T')[0] : undefined } })

  return (
    <form onSubmit={handleSubmit((data) => onSave(task.id, data))} className="space-y-2">
      <div>
        <Input {...register('title')} />
        {formState.errors.title && <p className="text-sm text-red-600">{formState.errors.title.message}</p>}
      </div>
      <div>
        <Input {...register('description')} />
      </div>
      <div className="flex gap-2">
        <Input {...register('dueDate')} type="date" />
        <Button type="submit">Save</Button>
        <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}