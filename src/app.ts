import express from "express";
import loadServer from "./loaders";
import envHandler from "./config/envHandler";

async function startServer(): Promise<void> {
  const app = express();

  loadServer(app);

  app.listen(envHandler.PORT, () => {
    console.log(`Server is running on port ${envHandler.PORT}`);
  });
}

void startServer();
