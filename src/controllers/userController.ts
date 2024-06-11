import { NextFunction, Request, Response } from "express";
import userModel from "../models/UserModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "../types/userTypes";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(400, "User Already exists");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while checking existing user"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password} = req.body;

  if(!email || !password){
    const error = createHttpError(400, "All Fields are Required")
    return next(error)
  }

  try {
    const user = await userModel.findOne({email})

    if(!user){
      const error = createHttpError(401, "User do not exist")
      return next(error)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch){
      const token = sign({sub: user._id}, config.jwtSecret as string, {
        expiresIn: "7d"
      })
      res.cookie("token", token, {httpOnly: true, secure: true})

      res.status(200).json({
        message: "User logged in successfully",
        data: user,
      })
    }


  } catch (error) {
    const err = createHttpError(500, "Error while logging in user")
    return next(err)
  }
}

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token")
  res.status(200).json({
    message: "User logged out successfully"
  })
}

export { createUser, loginUser, logoutUser };
