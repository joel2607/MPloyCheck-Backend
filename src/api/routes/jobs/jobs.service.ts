import { ErrorBadRequest } from "../../../helpers/errors";
import JobOffer, { type JobOfferType } from "../../../models/jobOffer";
import User from "../../../models/user";
import mongoose from "mongoose";
export const JobService = {
  FetchUserOffers: async (
    userId: string,
  ): Promise<JobOfferType[]> => {
    if(!mongoose.isValidObjectId(userId)){
      throw new ErrorBadRequest("Invalid UUID");
    }

    const existingUser = await User.findOne({ _id: userId });

    if (existingUser === null) {
      throw new ErrorBadRequest("User does not exist");
    }

    const offers = await JobOffer.find({ userId: existingUser._id });
    
    return offers
  },
};
