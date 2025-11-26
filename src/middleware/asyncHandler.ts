import { NextFunction, Request, Response } from "express";

/**
 * Async handler wrapper to catch errors in async route handlers
 * This prevents unhandled promise rejections that cause 502 errors
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
