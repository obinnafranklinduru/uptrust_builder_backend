import mongoose from "mongoose";
import { config } from "../config";

export default async (): Promise<void> => {
  try {
    await mongoose.connect(config.DB_URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
