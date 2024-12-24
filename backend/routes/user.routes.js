import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const router = express.Router();

//register router with validation
router.post("/register",[
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be 3 characters"),
  body("fullName.lastName").isLength({ min: 3 }).withMessage("Last name must be 3 characters"),
  body("password").isLength({ min: 6 }).withMessage("password must be 6 characters")
],
  registerUser);

  //login router with validation
router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 6 }).withMessage("password must be 6 characters"
)
], loginUser);


//user profile router with middleware
router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logoutUser);

export default router;