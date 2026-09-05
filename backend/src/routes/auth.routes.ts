import { Router } from "express";

import {
  signup,
  login,
  getMe,
} from "../controllers/auth.controller.js";

import { validateBody } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

import { loginSchema, signupSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post(
  "/signup",
  validateBody(signupSchema),
  signup
);

router.post(
  "/login",
  validateBody(loginSchema),
  login
);

router.get(
  "/me",
  authenticate,
  getMe
);

export default router;