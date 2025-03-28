import { Router } from "express";
import auth from "./routes/auth";
import jobs from "./routes/jobs";
import admin from "./routes/admin";

export default (): Router => {
  const app = Router();
  auth(app);
  jobs(app);
  admin(app);

  return app;
};
