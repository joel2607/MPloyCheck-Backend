import express, { type Express } from "express";
import cors from "cors";
import routes from "../api";

export default function initExpress(app: Express): Express {
  app.use(cors());

  app.use(express.json());

  app.use("/", routes());
  app.get("/health", (_req, res) => {
    res.status(200).end();
  });

  //app.use(errorHandler);

  return app;
}
