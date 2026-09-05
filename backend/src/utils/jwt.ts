import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface AccessTokenPayload {
  userId: string;
}

interface RefreshTokenPayload {
  userId: string;
}

export function generateAccessToken(userId: string): string {
  return jwt.sign(
    { userId } satisfies AccessTokenPayload,
    env.jwtAccessSecret,
    {
      expiresIn: env.jwtAccessExpiresIn,
    } as jwt.SignOptions
  );
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId } satisfies RefreshTokenPayload,
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn,
    } as jwt.SignOptions
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(
    token,
    env.jwtAccessSecret
  ) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(
    token,
    env.jwtRefreshSecret
  ) as RefreshTokenPayload;
}