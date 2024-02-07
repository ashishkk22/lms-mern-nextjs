import { NextFunction, Response, Request } from "express";
import { ErrorTypes } from "../types/Error.types";

export const ErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (error.name === ErrorTypes.CAST_ERROR) {
    message = `Resource not found. Invalid: ${error.path}`;
    statusCode = 400;
  }

  // Duplicate key error
  if (error.code === 11000) {
    message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    statusCode = 400;
  }

  // Wrong JWT error
  if (error.name === ErrorTypes.JSON_TOKEN_INVALID) {
    message = "Json web token is invalid, try again";
    statusCode = 400;
  }

  // JWT expired error
  if (error.name === ErrorTypes.JSON_TOKEN_EXPIRE) {
    message = "Json web token is expired, try again";
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default ErrorMiddleware;
