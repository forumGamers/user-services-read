import { NextFunction, Request, Response } from "express";
import AppError from "../base/error";
import User from "../database/user";
import response from "../middlewares/response";
import FollowingUser from "../database/followingUser";

export default class Controller {
  public static async getMultipleByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { ids } = req.query as Record<string, string>;

      if (!ids)
        throw new AppError({
          message: "query ids is required",
          statusCode: 400,
        });
      if (!ids.includes(","))
        throw new AppError({ message: "Invalid format", statusCode: 400 });

      const data: string[] = [];
      ids.split(",").forEach((el) => {
        if (
          !data.includes(el) &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            el
          ) &&
          el
        )
          data.push(el);
      });

      if (data.length > 25)
        throw new AppError({ message: "Data limit exceeded", statusCode: 413 });
      const users = await User.getUserProfileByIds(data);
      if (!users.rowLength)
        throw new AppError({ message: "Data not found", statusCode: 404 });

      const followed = await FollowingUser.checkIsFollow(data);

      response({
        res,
        code: 200,
        data: users.rows.map((el) => ({
          ...el,
          isFollow: !!followed.rows.find((el) => el.target === ""),
        })),
      });
    } catch (err) {
      next(err);
    }
  }
}
