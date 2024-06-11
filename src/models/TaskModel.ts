import { Schema } from 'mongoose';
import { Task } from '../types/taskTypes';

const taskSchema = new Schema<Task>({
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
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
});

export default taskSchema;
