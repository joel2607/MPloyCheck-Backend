import { Router } from "express";
import { JobsController } from "./jobs.controller";
import verifyToken from "../../middlewares/verifyToken";

const jobsRouter = Router();

export default (app: Router): void => {
  app.use("/jobs", jobsRouter);

  jobsRouter.get("/:id", verifyToken, JobsController.FetchJobs);
};
