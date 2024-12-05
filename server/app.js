import express from 'express'
import userRouter from './routes/user.routes.js'

export const app = express()

// common middlewares
app.use(express.json())

// api v1 routes
app.use('/api/v1/user', userRouter)