import {Router} from 'express'
import { reviewIncrement } from '../../controllers/reviewControllers.js'

// configure router
export const reviewRouter = Router()

// add review
reviewRouter.post('/add-review', reviewIncrement)
