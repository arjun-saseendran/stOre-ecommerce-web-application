import {Router} from 'express'
import { reviewIncrement } from '../../controllers/review.controller.js'


export const reviewRouter = Router()

reviewRouter.post('/add-review', reviewIncrement)
