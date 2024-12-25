import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { BlacklistTokenModel } from "../models/blacklistToken.model.js";
import { captainModel } from "../models/captain.model.js";

// Middleware to authenticate a user based on their token
export const authUser = async (req, res, next) => {
  try {
    // Extract the token from cookies or the authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    // If no token is provided, return a 401 (Unauthorized) response
    if (!token) {
      return res.status(401).json({ message: "Unauthorized to access this route" });
    }

    // Check if the token is in the blacklist
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized to access this route" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the decoded token
    const user = await userModel.findById(decoded._id);

    // Attach the user object to the request for use in subsequent middleware or routes
    req.user = user;
    return next(); // Proceed to the next middleware or route handler

  } catch (error) {
    // Handle any server errors and return a 500 (Internal Server Error) response
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to authenticate a captain based on their token
export const authCaptain = async (req, res, next) => {
  try {
    // Extract the token from cookies or the authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    // If no token is provided, return a 401 (Unauthorized) response
    if (!token) {
      return res.status(401).json({ message: "Unauthorized to access this route" });
    }

    // Check if the token is in the blacklist
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token using the secret key
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Find the captain associated with the decoded token
    const captain = await captainModel.findById(decode._id);

    // Attach the captain object to the request for use in subsequent middleware or routes
    req.captain = captain;
    return next(); // Proceed to the next middleware or route handler

  } catch (error) {
    // Handle any server errors and return a 500 (Internal Server Error) response
    return res.status(500).json({ message: "Internal server error" });
  }
};
