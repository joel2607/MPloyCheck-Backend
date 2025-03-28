import mongoose, { type Document, type Schema } from "mongoose";

export interface JobOfferType extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: number;
  description: string;
  status: string; 
  createdAt: Date;
  updatedAt: Date;
}

const jobOfferSchema = new mongoose.Schema<JobOfferType>({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

jobOfferSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    ret.__v = undefined;
    return ret;
  },
});

const JobOffer = mongoose.model<JobOfferType>("JobOffer", jobOfferSchema);

export default JobOffer;
