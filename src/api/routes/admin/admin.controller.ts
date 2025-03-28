import { saveValue } from "../../../helpers/localStorage";
import catchAsync from "../../../helpers/catchAsync";
import type { Response, Request } from "express";

export const AdminController = {
  SetDelay: catchAsync(async (req: Request, res: Response) => {

    saveValue('delay', req.body.value);

    return res.json({
        message: "Delay set.",
        delay: req.body.value
    });
  }),  

  GetDelay: catchAsync(async (_req: Request, res: Response) => { 

    return res.json({
        message: "Delayed."
    });
  }),  


  
};