import { Request } from "express";
import AppError from "./error";
import user from "../interfaces/user";
import User from "../database/user";
import { types } from "cassandra-driver";

export default abstract class BaseAuthMiddleware {
  protected getTokens(req: Request) {
    const { access_token } = req.headers as Record<string, string>;
    if (!access_token)
      throw new AppError({ message: "invalid token", statusCode: 401 });
    return access_token;
  }

  protected async getUser(token: string) {
    const user = await User.getUserByToken(token);
    if (!user.rowLength)
      throw new AppError({ message: "invalid token", statusCode: 401 });

    return user.rows[0] as types.Row & user;
  }

  protected bindRequest(
    req: Request,
    loggedAs: "User" | "Admin" | "Seller" | null,
    user: user | null
  ) {
    req.user = {
      loggedAs,
      author: user,
    };
  }
}
