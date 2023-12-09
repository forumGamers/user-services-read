import type { NextFunction, Request, Response } from "express";

export interface IUserController {
  getMultipleByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  getUserData(req: Request, res: Response, next: NextFunction): void;

  getUserFollowingRecomendation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
