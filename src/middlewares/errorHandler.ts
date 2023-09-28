import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../base/error";
import response from "./response";

class ErrorHandler {
  public errorHandling(
    err: ApplicationError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    let message = err.message ?? "Internal Server Error";
    let code = (err as ApplicationError).statusCode ?? 500;

    const payload: any = {
      res,
      code,
      message,
    };
    if ((err as ApplicationError).data)
      payload.data = (err as ApplicationError).data;

    response(payload);
  }
}

export default new ErrorHandler().errorHandling;
