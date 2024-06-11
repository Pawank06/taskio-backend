import mongoose from "mongoose";
import { Board } from "../types/boardTypes";

const boardSchema = new mongoose.Schema<Board>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Board>("Board", boardSchema);
