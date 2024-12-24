import dotenv from "dotenv";
import { app } from "./app.js"
import connectDB from "./database/db.js";

dotenv.config();

//connect to the db
connectDB()
.then(() => {
  const port = process.env.PORT || 3000;

  //start the server and listen on the port
  app.listen(port, () => {
    console.log(`Server is running on the port : ${port}`);
  });

}).catch((err) => {
  // Log an error message if the database connection fails
  console.log("MONGO DB connection failed !!!", err);
});