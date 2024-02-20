import "reflect-metadata";
import express from "express";
import databaseConnection from "./utility/databaseClient";
import expressApp from "./express.app";

const PORT: number = 3000 || Number(process.env.PORT);

const startServer = async (): Promise<void> => {
  const app = express();

  await databaseConnection();
  await expressApp(app);

  const server = app
    .listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
    .on("error", (err: unknown) => {
      console.error("Error starting the server:", err);
      process.exit(1);
    });

  process.on("SIGINT", () => {
    console.log("Received SIGINT. Closing server gracefully.");
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    console.log("Received SIGTERM. Closing server gracefully.");
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
};

startServer();
