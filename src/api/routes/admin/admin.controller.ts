import catchAsync from "../../../helpers/catchAsync";
import type { Response, Request } from "express";
// import { ErrorBadRequest } from "../../../helpers/errors";
import storage from 'node-persist';

export const AdminController = {
  SetDelay: catchAsync(async (_req: Request, res: Response) => {
    
    
    await storage.setItem('key', 'value');

    return res.json({
        message: "Delay set."
    });
  }),  

  GetDelay: catchAsync(async (_req: Request, res: Response) => { 

    return res.json({
        message: "Delayed."
    });
  }),  


  
};