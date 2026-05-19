import type { Request, Response, NextFunction } from "express";

type AppError = Error & { statusCode?: number; code?: string };

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";

  console.error(`[error] ${code}:`, err.message);

  res.status(statusCode).json({
    error: err.message || "Something went wrong",
    code,
  });
};
