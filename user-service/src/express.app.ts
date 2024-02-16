import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

import userRoutes from "./routes";

const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};

export default async (app: Application): Promise<void> => {
  try {
    // Security Middlewares Configuration
    app.use(helmet()); // set security HTTP headers
    app.use(cors()); // Enable CORS for handling cross-origin requests
    app.options("/*", cors());
    app.use(compression()); // gzip compression
    app.use(express.json()); // Enable JSON parsing for request bodies
    app.use(express.urlencoded({ extended: true })); // Enable parse urlencoded request body
    app.use(mongoSanitize()); // sanitize request data
    app.use(hpp()); // protect against HTTP Parameter Pollution attacks

    // Configure user-related routes and middleware
    app.use(userRoutes);

    app.use(ErrorHandler);
  } catch (error) {
    console.error("Error configuring the Express application:", error);
    process.exit(1);
  }
};
