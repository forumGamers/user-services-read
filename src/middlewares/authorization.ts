import { NextFunction, Request, Response } from "express";
import jwt from "../helpers/jwt";
import BaseAuthMiddleware from "../base/middlewares";

class Authorize extends BaseAuthMiddleware {
  constructor() {
    super();
  }

  public async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token } = req.headers as Record<
        string,
        string | undefined
      >;
      if (access_token) {
        const payload = jwt.decodeToken(access_token);
        try {
          const user = await this.getUser(access_token);
          this.bindRequest(req, payload.loggedAs, user);
        } catch (err) {
          this.bindRequest(req, null, null);
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new Authorize().authorize.bind(new Authorize());
