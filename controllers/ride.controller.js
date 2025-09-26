const ridemodel = require("../models/ride.models");
const { publishToQueue } = require("../service/rabbitmq");

module.exports.createRide = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    const newRide = new ridemodel({
      user: req.user._id,
      pickup,
      destination,
    });

    await newRide.save();
    publishToQueue("new-ride", JSON.stringify(newRide));
    res.send(newRide);

    res.status(201).json({
      message: "Ride request created and is being processed.",
      ride: newRide,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports.acceptRide = async (req, res, next) => {
  const { rideId } = req.query;
  const ride = await ridemodel.findById(rideId);
  if (!ride) {
    return res.status(404).json({ message: "Ride not found" });
  }

  ride.status = "accepted";
  await ride.save();
  publishToQueue("ride-accepted", JSON.stringify(ride));
  res.send(ride);
};
