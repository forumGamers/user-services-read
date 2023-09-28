import { NextFunction, Request, Response } from "express";
import AppError from "../base/error";
import jwt from "../helpers/jwt";

class Auth {
  private getTokens(req: Request) {
    const { access_token } = req.headers as Record<string, string>;
    if (!access_token)
      throw new AppError({ message: "invalid token", statusCode: 401 });
    return access_token;
  }

  public async Authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token = this.getTokens(req);
      const payload = jwt.verifyToken(access_token);

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new Auth().Authentication.bind(new Auth());
