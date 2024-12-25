import { BlacklistTokenModel } from "../models/blacklistToken.model.js";
import { captainModel } from "../models/captain.model.js"; 
import { createCaptain } from "../services/captain.service.js"; 
import { validationResult } from 'express-validator'; 

// Controller function to handle the registration of a new captain
export const registerCaptain = async (req, res) => {

  // Check for validation errors in the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract necessary fields from the request body
  const { fullName, email, password, vehicle } = req.body;

  // Hash the password for secure storage
  const hashedPassword = await captainModel.hashPassword(password);

  // Check if a captain with the same email is already registered
  const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

  if (isCaptainAlreadyRegistered) {
    // If a captain is already registered with this email, return a 400 status with an error message
    return res.status(400).json({ error: "Captain already registered" });
  }

  try {
    // Create a new captain in the database using the extracted data
    const captain = await createCaptain({
      firstName: fullName.firstName, 
      lastName: fullName.lastName, 
      email, 
      password: hashedPassword, 
      color: vehicle.color, 
      plateNumber: vehicle.plateNumber, 
      capacity: vehicle.capacity, 
      vehicleType: vehicle.vehicleType, 
    });

    // Generate an authentication token for the newly registered captain
    const token = await captain.generateAuthToken();

    res.status(201).json({ token, captain });

  } catch (error) {
    // If there is an error during the process, return a 500 status with the error message
    return res.status(500).json({ error: error.message });
  }
};


// Controller function to handle Captain login
export const loginCaptain = async (req, res) => {
  try {
    // Check for validation errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find a captain with the given email and include the password field (which is usually excluded)
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      // If no captain is found with the provided email, return a 400 status with an error message
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
      // If the passwords don't match, return a 400 status with an error message
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Generate an authentication token for the captain
    const token = await captain.generateAuthToken();

    // Set the authentication token as a cookie in the response
    res.cookie("token", token);

    // Send a success response with the token and captain details
    res.status(200).json({ token, captain });

  } catch (error) {
    // Catch any errors during the process and return a 500 status with the error message
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in. Please try again later.",
      error: error.message, // Provide the error message for debugging (optional in production)
    });
  }
};

// Controller function to get the profile of the authenticated captain
export const getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain})
}

// Controller function to handle the logout of a captain
export const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Captain logged out successfully" });
}
