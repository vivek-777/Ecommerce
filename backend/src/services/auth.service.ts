import { UserModel } from "../models/user.model.js";
import { AppError } from "../errors/AppError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import { googleOAuthClient } from "../config/google.js";
import { env } from "../config/env.js";

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

  if (!user || !user.password) {
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

export function getGoogleAuthUrl(){
  return googleOAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
};

export async function handleGoogleCallback(code: string) {
  // 1. Exchange authorization code for Google tokens
  const { tokens } = await googleOAuthClient.getToken(code);

  if(!tokens) {
    throw new AppError(
      400,
      "Failed to retrieve tokens from Google",
      "GOOGLE_TOKEN_ERROR"
    );
  }
  
  // 2. Verify Google ID token
  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: tokens.id_token!,
    audience: env.googleClientId, // Specify the CLIENT_ID of the app that accesses the backend
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new AppError(
      400,
      "Failed to retrieve user information from Google",
      "GOOGLE_USER_INFO_ERROR"
    );
  }

  // 3. Get Google user information
  const email = payload.email.toLowerCase();
  const name = payload.name || "Google User";
  
  // 4. Find user in MongoDB
  let user = await UserModel.findOne({ email });

  // 5. Create user if they don't exist
  if (!user) {
    user = await UserModel.create({
      name,
      email,
      provider: "google",
    });
  }

  // 6. Generate YOUR application's JWT tokens
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