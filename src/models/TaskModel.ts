import mongoose from 'mongoose';
import { Task } from '../types/taskTypes';

const taskSchema = new mongoose.Schema<Task>({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
});

export default mongoose.model<Task>("Task", taskSchema);
