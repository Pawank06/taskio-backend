import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createHttpError(401, "Authorization token is required"));
  }

  // console.log(token)
  

  try {
    const decoded = verify(token, config.jwtSecret as string);
    // If token is valid, you can attach the decoded payload to the request object for later use
    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;
    next(); // Call next middleware
  } catch (error) {
    return next(createHttpError(401, "Invalid or expired token"));
  }
};

export default authenticate;
