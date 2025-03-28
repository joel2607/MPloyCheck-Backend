import catchAsync from "../../../helpers/catchAsync";
import type { Response, Request } from "express";
import { ErrorBadRequest } from "../../../helpers/errors";
import { JobService } from "./jobs.service";

export const JobsController = {
  FetchJobs: catchAsync(async (req: Request, res: Response) => {
    
    
    if (!req.params.id) {
      throw new ErrorBadRequest("no id");
    }

    const offers = await JobService.FetchUserOffers(req.params.id);

    return res.json(offers);
  }),  

  
};
