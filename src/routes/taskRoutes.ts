import express from 'express';
import {createTask} from '../controllers/taskController';
import authenticate from '../middlewares/authMiddleware';

const router = express.Router()

router.post('/create', authenticate, createTask)


export default router