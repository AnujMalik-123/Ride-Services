const express = require("express");
const router = express.Router();

const rideController = require("../controllers/ride.controller");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/create-ride", authmiddleware.rideAuth, rideController.createRide);
router.put(
  "/accept-ride",
  authmiddleware.captainAuth,
  rideController.acceptRide
);
module.exports = router;
