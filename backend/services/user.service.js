import { userModel } from "../models/user.model.js";

export const createUser = async ( { firstName, lastName, email, password }) => {
  try {

    // Validate that all required fields are provided
    if(!firstName, !lastName, !email, !password) {
      throw new Error("All fields are required!");
    };
  
    // Check if the email is already registered
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
      throw new Error("This email is already registered.");
    };
  
    // Create a new user in the database
    const user = await userModel.create({
      fullName: {
        firstName,
        lastName
      },
      email,
      password
    });

    return user;

  } catch (error) {
      // Handle errors and return a meaningful response with the specific error message
      let errorMessage = "An error occurred while creating the account. Please try again later.";

      if (error.message === "All fields are required!") {
      errorMessage = "All fields are required!";
    } else if (error.message === "This email is already registered.") {
      errorMessage = "This email is already registered.";
    }

    return {
      success: false,
      message: errorMessage,
      error: error.message, // Include the actual error message for debugging
    };
  }
}
