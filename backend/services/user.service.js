import { userModel } from "../models/user.model.js";

// Function to create a new user in the database
export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    // Step 1: Validate that all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required!");
    }

    // Step 2: Check if the email is already registered
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      throw new Error("This email is already registered.");
    }

    // Step 3: Create a new user in the database
    const user = await userModel.create({
      fullName: {
        firstName, // Assign the first name to the fullName object
        lastName,  // Assign the last name to the fullName object
      },
      email,      // Assign the user's email
      password,   // Assign the user's password
    });

    // Return the newly created user object
    return user;

  } catch (error) {
    // Step 4: Handle errors and provide a meaningful response
    let errorMessage = "An error occurred while creating the account. Please try again later.";

    // Customize the error message for specific cases
    if (error.message === "All fields are required!") {
      errorMessage = "All fields are required!";
    } else if (error.message === "This email is already registered.") {
      errorMessage = "This email is already registered.";
    }

    // Return the error response
    return {
      success: false,         // Indicate the failure of the operation
      message: errorMessage,  // Provide a user-friendly error message
      error: error.message,   // Include the actual error message for debugging (optional)
    };
  }
};
