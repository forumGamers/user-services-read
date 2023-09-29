import { NextFunction, Request, Response } from "express";
import jwt from "../helpers/jwt";
import BaseAuthMiddleware from "../base/middlewares";

class Auth extends BaseAuthMiddleware {
  constructor() {
    super();
  }

  public async Authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token = this.getTokens(req);
      const payload = jwt.verifyToken(access_token);

      const user = await this.getUser(access_token);
      this.bindRequest(req, payload.loggedAs, user);

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new Auth().Authentication.bind(new Auth());
