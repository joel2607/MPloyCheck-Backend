import { Router } from "express";
import { AdminController } from "./admin.controller";

const adminRouter = Router();

export default (app: Router): void => {
  app.use("/", adminRouter);

  adminRouter.get("/admin", AdminController.GetDelay);
  adminRouter.post("/admin", AdminController.SetDelay);
};
