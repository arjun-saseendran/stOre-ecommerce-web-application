import { Router } from "express";
import { activateUser, deleteUser, renderAllUsers, renderAllSellers, activateSeller, deleteSeller, checkAdmin, getInactiveUsers} from "../../controllers/adminControllers.js";
import {adminAuth} from '../../middlewares/adminAuth.js'

// Configure router
export const adminRouter = Router()

// Check admin when routing
adminRouter.get("/check-admin", adminAuth, checkAdmin);

// Display all users
adminRouter.get('/users', adminAuth, renderAllUsers)

// Display all inactive users
adminRouter.get('/users-inactive', adminAuth, getInactiveUsers)

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
