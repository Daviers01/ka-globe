import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth'
import taskRoutes from './routes/tasks'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => res.send({ ok: true }))

export default app
