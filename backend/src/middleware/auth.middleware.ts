import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: any;
}

export default function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = header.split(" ")[1];

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}