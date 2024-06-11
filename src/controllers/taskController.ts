import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import TaskModel from '../models/TaskModel';
import mongoose from 'mongoose';

// Define an interface for the request body
interface CreateTaskRequest extends Request {
    body: {
        title: string;
        board: string; // Assuming board ID is passed as a string
    };
}

const createTask = async (req: CreateTaskRequest, res: Response, next: NextFunction) => {
    const { title, board } = req.body;

    if (!title) {
        const error = createHttpError(400, "Task title is required");
        return next(error);
    }

    if (!board) {
        const error = createHttpError(400, "Board ID is required");
        return next(error);
    }

    try {
        const task = await TaskModel.create({
            title,
            board,
        });

        res.status(201).json({
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        const err = createHttpError(500, "Error while creating task");
        return next(err);
    }
};

export { createTask };
