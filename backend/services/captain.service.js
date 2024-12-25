import { captainModel } from "../models/captain.model.js";

// Function to create a new captain in the database
export const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plateNumber,
  capacity,
  vehicleType
}) => {
  // Check if any required fields are missing
  if (!firstName || !lastName || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
    // Throw an error if any field is missing
    throw new Error("All fields are required");
  }

  // Create a new captain in the database
  const captain = await captainModel.create({
    fullName: {
      firstName, // Assign firstName to the fullName field
      lastName   // Assign lastName to the fullName field
    },
    email,         // Assign email
    password,      // Assign password
    vehicle: {     // Assign vehicle details
      color,        // Vehicle color
      plateNumber,  // Vehicle plate number
      capacity,     // Vehicle capacity
      vehicleType   // Type of the vehicle (e.g., car, truck)
    }
  });

  // Return the newly created captain object
  return captain;
};
