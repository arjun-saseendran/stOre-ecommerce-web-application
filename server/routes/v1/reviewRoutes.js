import {Router} from 'express'
import { reviewIncrement } from '../../controllers/reviewControllers.js'

// Configure router
export const reviewRouter = Router()

// Add review
reviewRouter.post('/add-review', reviewIncrement)
