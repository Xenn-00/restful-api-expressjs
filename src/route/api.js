import express from "express"
import userController from "../controller/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import contactController from "../controller/contact.controller.js"
import addressController from "../controller/address.controller.js"

const userRouter = express.Router()

userRouter.use(authMiddleware)
// User API
userRouter.get("/api/users/current", userController.get)
userRouter.patch("/api/users/current", userController.update)
userRouter.delete("/api/users/logout", userController.logout)

// Contact API
userRouter.post("/api/contacts", contactController.create)
userRouter.get("/api/contacts/:contactId", contactController.get)
userRouter.put("/api/contacts/:contactId", contactController.update)
userRouter.delete("/api/contacts/:contactId", contactController.remove)
userRouter.get("/api/contacts", contactController.search)

// Address API
userRouter.post("/api/contacts/:contactId/address", addressController.create)

export {
    userRouter
}