import express, {Router} from 'express'
import { createUser } from '../controllers/userController'

const router = express.Router()

router.post("/register", createUser)

export default router
