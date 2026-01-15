import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { AuthRequest } from '../middleware/auth'

export async function getTasks(req: AuthRequest, res: Response) {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId } })
  res.json(tasks)
}

export async function getTask(req: AuthRequest, res: Response) {
  const id = String(req.params.id)
  const task = await prisma.task.findFirst({ where: { id, userId: req.userId } })
  if (!task) return res.status(404).json({ error: 'Not found' })
  res.json(task)
}

export async function createTask(req: AuthRequest, res: Response) {
  const { title, description, dueDate, priority, tags } = req.body
  const task = await prisma.task.create({ data: { title, description, dueDate: dueDate ? new Date(dueDate) : null, priority: priority || 'medium', tags: tags || [], userId: req.userId! } })
  res.status(201).json(task)
}

export async function updateTask(req: AuthRequest, res: Response) {
  const id = String(req.params.id)
  const existing = await prisma.task.findFirst({ where: { id, userId: req.userId } })
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const { title, description, completed, dueDate, priority, tags } = req.body
  const updated = await prisma.task.update({ where: { id }, data: { title, description, completed, dueDate: dueDate ? new Date(dueDate) : null, priority, tags } })
  res.json(updated)
}

export async function deleteTask(req: AuthRequest, res: Response) {
  const id = String(req.params.id)
  const existing = await prisma.task.findFirst({ where: { id, userId: req.userId } })
  if (!existing) return res.status(404).json({ error: 'Not found' })

  await prisma.task.delete({ where: { id } })
  res.status(204).send()
}
