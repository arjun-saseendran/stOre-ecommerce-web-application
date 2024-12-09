import {Router} from 'express'
import { addReview } from '../../controllers/reviewControllers.js'
import {authUser} from '../../middlewares/userAuth.js'

// Configure router
export const reviewRouter = Router()

// Add review
reviewRouter.post('/add-review', authUser, addReview)
