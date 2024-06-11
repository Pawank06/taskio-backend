import { Board } from "./boardTypes";

export interface Task {
    _id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
    board: Board; // This should be changed to Schema.Types.ObjectId
    createdAt: string;
    updatedAt: string;
}
