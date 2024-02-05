import { NextFunction, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { ErrorTypes } from "../types/Error.types";

export const ErrorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  error: any
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  //wrong mongodb id error

  if (error.name === ErrorTypes.CAST_ERROR) {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  //Duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (error.name === ErrorTypes.JSON_TOKEN_INVALID) {
    const message = "Json web token is invalid, try again";
    error = new ErrorHandler(message, 400);
  }

  //JWT expired error
  if (error.name === ErrorTypes.JSON_TOKEN_EXPIRE) {
    const message = `Json web token is expired, try again`;
    error = new ErrorHandler(message, 400);
  }
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
