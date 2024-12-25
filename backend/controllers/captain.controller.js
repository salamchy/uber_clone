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
