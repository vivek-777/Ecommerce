import { google } from "googleapis";
import { env } from "./env.js";

export const googleOAuthClient = new google.auth.OAuth2(
  env.googleClientId,
  env.googleClientSecret,
  env.googleCallbackUrl
);