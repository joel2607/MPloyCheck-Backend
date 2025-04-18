import mongoose, { type Document, type Schema } from "mongoose";

export interface UserType extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

const userSchema = new mongoose.Schema<UserType>({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, 
    enum: ["general", "admin"], 
    default: "general"
  },
});

userSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    ret.passwordHash = undefined;
    ret.__v = undefined;
    return ret;
  },
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
