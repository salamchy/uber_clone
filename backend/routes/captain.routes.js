import express from 'express';
import { body } from 'express-validator';
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

const router = express.Router();

//captain register router
router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email").withMessage("Invalid Email"),
    body('fullName.firstName').isLength({ min: 3 }).withMessage("First name must be 3 characters"),
    body('fullName.lastName').isLength({ min: 3 }).withMessage("Last name must be 3 characters"),
    body('password').isLength({ min: 8 }).withMessage("password must be 8 characters"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be 3 characters"),
    body('vehicle.plateNumber').isLength({ min: 1, max:15 }).withMessage("Plate number should not be less than 1 and greater than 15 characters"),
    body('vehicle.capacity').isNumeric().withMessage("Capacity must be a number"),
    body('vehicle.vehicleType').isIn(['motorcycle', 'scooty', 'car']).withMessage("Invalid vehicle type")
], 
  registerCaptain);


//captain login router
router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters")
], 
  loginCaptain);

//captain profile router
router.get("/profile", authCaptain, getCaptainProfile);

//captain logout router
router.get("/logout", authCaptain, logoutCaptain);

export default router;