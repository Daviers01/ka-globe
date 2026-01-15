import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController'

const router = Router()

// router.use(requireAuth)

router.get('/', getTasks)
router.post('/', createTask)
router.get('/:id', getTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
