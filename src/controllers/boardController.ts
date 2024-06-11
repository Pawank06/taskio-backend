import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import BoardModel from "../models/BoardModel";

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;

  if(!title){
    const error = createHttpError(400, "Title is required")
    return next(error)
  }

  const board = await BoardModel.findOne({title})

  if(board){
    const error = createHttpError(400, "Board already exists")
    return next(error)
  }

  try {
   const newBoard = await BoardModel.create({
      title,
      description
   })

   res.status(200).json({
     message: "Board created successfully",
     data: newBoard
   })
  } catch (error) {
      const err = createHttpError(400, "Board creation failed")
      return next(err)
  }
};

export { createBoard };
