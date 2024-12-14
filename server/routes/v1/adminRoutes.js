import { Router } from "express";
import { activateUser, deleteUser, renderAllUsers, renderAllSellers, activateSeller, deleteSeller} from "../../controllers/adminControllers.js";
import {adminAuth} from '../../middlewares/adminAuth.js'

// Configure router
export const adminRouter = Router()

// Display all users
adminRouter.get('/users', adminAuth, renderAllUsers)

// Activate user
adminRouter.post('/activate-user/:id', adminAuth, activateUser)

// Delete user
adminRouter.delete('/delete-user/:id', adminAuth, deleteUser)

// Display all sellers
adminRouter.get('/sellers', adminAuth, renderAllSellers)

// Activate seller
adminRouter.post('/activate-seller/:id', adminAuth, activateSeller)

// Delete seller
adminRouter.delete('/delete-seller/:id', adminAuth, deleteSeller)
