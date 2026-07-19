import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export default function role(...roles: string[]) {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }

    next();
  };
}