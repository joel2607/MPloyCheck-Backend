import envHandler from "../config/envHandler";
import mongoose from "mongoose";

async function connectToDB(): Promise<void> {
  const DB_DATABASE = envHandler.DB_DATABASE
  const DB_URL = envHandler.DB_URL;

  const url = `${DB_URL}/${DB_DATABASE}`
  try {
    await mongoose.connect(url);
    console.log("Connected to Database!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error connecting to the database: ${error.message}`);
    } else {
      console.error(
        "An unknown error occurred while connecting to the database.",
      );
    }
    process.exit(1);
  }
}

export default connectToDB;
