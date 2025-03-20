import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "./config";
import { AuthError, InputError } from "../errors";

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return next(new InputError({ message: 'Token required' }));
    jwt.verify(token, CONFIG.JWT_SECRET);
    next()
  } catch (error) {
    console.log(error)
    return next(new AuthError({ message: 'Invalid or expired token'}));
  }
}
