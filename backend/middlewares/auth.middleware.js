import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized to access this route" });
  }

  const isBlacklisted = await userModel.findOne({ token: token});

  if(isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();

  } catch (error) {
    //server error
    return res.status(500).json({ message: "Internal server error" });
  }
};