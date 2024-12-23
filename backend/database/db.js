import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables and the database name from constants
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    // Log a success message with the MongoDB host information
    console.log(`\n MONGODB connected ! DB HOST : ${connectionInstance.connection.host}`);

  } catch (error) {

    // Log an error message if the connection fails
    console.log("MONGODB connection failed", error);
        
    // Exit the process with a failure code (1) if the connection could not be established
    process.exit(1);
  }
} 

export default connectDB;