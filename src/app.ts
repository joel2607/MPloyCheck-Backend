import express from "express";
import loadServer from "./loaders";
import envHandler from "./config/envHandler";
import { delayMiddleware } from "./api/middlewares/delayMiddleware";

async function startServer(): Promise<void> {
  const app = express();

  // Setting up the delay globally
  app.use(delayMiddleware);

  loadServer(app);

  app.listen(envHandler.PORT, () => {
    console.log(`Server is running on port ${envHandler.PORT}`);
  });
}

void startServer();
