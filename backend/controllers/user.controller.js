import { createUser } from "../services/user.service.js"; 
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { userModel } from "../models/user.model.js";
import { BlacklistTokenModel } from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {   
  try {
    // Validate request inputs using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure user details from the request body
    const { fullName, email, password } = req.body;

    // Hash the user password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call createUser function to create a new user
    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the newly registered user
    const token = user.generateAuthToken;

    // Respond with the token and user data
    res.status(201).json({ token, user });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure email and password from request body
    const { email, password } = req.body;

    // Find the user by email, including the password field (must explicitly select it if it's set to `select: false`)
    const user = await userModel.findOne({ email }).select("+password");

    // If no user is found, return an error response
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, return an error response
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token using the user instance method
    const token = user.generateAuthToken();

    res.cookie("token", token);

    // Respond with the token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    // Catch and handle errors
    console.error("Error during login:", error.message);

    // Respond with a generic error message to avoid exposing sensitive details
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
      error: error.message, // Optional: Include for debugging (avoid in production)
    });
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
}

//logout user
export const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Get the token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Add the token to the blacklist
    await BlacklistTokenModel.create({ token });

    // Respond with success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error during logout:", error.message);

    res.status(500).json({
      success: false,
      message: "An error occurred during logout. Please try again later.",
      error: error.message, // Optional: Include for debugging
    });
  }
};
