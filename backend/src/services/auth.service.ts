import { UserModel } from "../models/user.model.js";
import { AppError } from "../errors/AppError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";

export async function signup(input: {
  name: string;
  email: string;
  password: string;
}) {
  const email = input.email.toLowerCase();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new AppError(
      409,
      "Email is already registered",
      "EMAIL_ALREADY_EXISTS"
    );
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await UserModel.create({
    name: input.name,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function login(input: {
  email: string;
  password: string;
}) {
  const email = input.email.toLowerCase();

  // password is select:false, so explicitly include it
  const user = await UserModel.findOne({ email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(
      401,
      "Invalid email or password",
      "INVALID_CREDENTIALS"
    );
  }

  const passwordMatches = await comparePassword(
    input.password,
    user.password
  );

  if (!passwordMatches) {
    throw new AppError(
      401,
      "Invalid email or password",
      "INVALID_CREDENTIALS"
    );
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

// ADD THIS
export async function getCurrentUser(userId: string) {
  const user = await UserModel.findById(userId).select(
    "_id name email createdAt updatedAt"
  );

  if (!user) {
    throw new AppError(
      404,
      "User not found",
      "USER_NOT_FOUND"
    );
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}