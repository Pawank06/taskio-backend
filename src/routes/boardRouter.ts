import express from 'express';
import { createBoard } from '../controllers/boardController';
import authenticate from '../middlewares/authMiddleware';

const router = express.Router()

router.post("/create", authenticate, createBoard)


export default router