import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new AppError(
        401,
        "Authentication required",
        "UNAUTHENTICATED"
      );
    }

    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
    };

    next();
  } catch {
    next(
      new AppError(
        401,
        "Invalid or expired access token",
        "INVALID_ACCESS_TOKEN"
      )
    );
  }
}