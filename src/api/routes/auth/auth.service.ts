import { ErrorBadRequest } from "../../../helpers/errors";
import type { loginDtoType, registerDtoType } from "./auth.dto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User, { type UserType } from "../../../models/user";
import envHandler from "../../../config/envHandler";
import bcrypt from 'bcrypt';

export const AuthService = {
  Register: async (
    registerDto: registerDtoType,
  ): Promise<{ token: string; user: UserType }> => {
    const existingUser = await User.findOne({ email: registerDto.email });

    if (existingUser != null) {
      throw new ErrorBadRequest("Email already exists");
    }

    const hashedpassword = await bcrypt.hash(registerDto.password, 12);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      passwordHash: hashedpassword,
      email: registerDto.email,
      name: registerDto.name,
      role: registerDto.role
    });

    await newUser.save();
    const token = jwt.sign({ userID: newUser._id, role: newUser.role }, envHandler.JWT_KEY, {
      expiresIn: "7d",
    });

    return { token, user: newUser };
  },

  Login: async (
    loginDto: loginDtoType,
  ): Promise<{ token: string; user: UserType }> => {

    const user = await User.findOne({ email: loginDto.email });

    if (user === null) {
      throw new ErrorBadRequest("Invalid email");
    }

    
    const result = bcrypt.compare(user.passwordHash, loginDto.password);
    if (!result) {
      throw new ErrorBadRequest("Invalid password");
    }

    const token = jwt.sign({ userID: user._id, role: user.role }, envHandler.JWT_KEY, {
      expiresIn: "7d",
    });

    return { token, user };
  },
};
