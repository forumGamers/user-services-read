import type { NextFunction, Request, Response } from "express";
import AppError from "../base/error";
import User from "../database/user";
import response from "../middlewares/response";
import type { IUserController } from "../interfaces/controllers";

export default new (class implements IUserController {
  public async getMultipleByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { ids } = req.query as Record<string, string>;
      const { author } = req.user;

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

      response({
        res,
        code: 200,
        data: users.rows.map((el) => ({
          ...el,
          isFollowing:
            el.followers &&
            el.followers.length &&
            author !== null &&
            el.followers.find((el: string) => el === author?.id)
              ? true
              : false,
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  public async getUserData(req: Request, res: Response): Promise<void> {
    response({ res, code: 200, data: req.user.author });
  }

  public async getUserFollowingRecomendation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { author } = req.user;

      const data = await User.getFollowingRecomendation();

      if (!data.rowLength)
        throw new AppError({ message: "Data not found", statusCode: 404 });

      response({
        res,
        code: 200,
        data: data.rows.filter(
          (row) => !(author?.following || []).includes(row.id.toString())
        ),
      });
    } catch (err) {
      next(err);
    }
  }

  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user = await User.getUserById(id);
      if (!user.rowLength)
        throw new AppError({ message: "Data not found", statusCode: 404 });

      response({ res, code: 200, message: "OK", data: user.first() });
    } catch (err) {
      next(err);
    }
  }
})();
