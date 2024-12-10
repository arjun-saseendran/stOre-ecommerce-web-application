import {Router} from 'express'
import { addReview } from '../../controllers/reviewControllers.js'
import {userAuth} from '../../middlewares/userAuth.js'

// Configure router
export const reviewRouter = Router()

// Add review
reviewRouter.post('/add-review', userAuth, addReview)
