import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const data = await authService.login(
    email,
    password
  );

  res.json(data);
}