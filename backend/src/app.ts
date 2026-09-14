import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// Helmet configuration
app.use(helmet());

//CORS configuration  
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Express middleware configuration
app.use(express.json());

// Cookie parser configuration
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;