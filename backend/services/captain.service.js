import { captainModel } from "../models/captain.model.js";

export const createCaptain = async ({
  firstName, lastName, email, password, color, plateNumber, capacity, vehicleType
}) => {
  if (!firstName || !lastName || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  };

  const captain = captainModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password,
    vehicle: {
      color,
      plateNumber,
      capacity,
      vehicleType
    }
  });
  return captain;
}