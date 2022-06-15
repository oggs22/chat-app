const asyncHandler = require("express-async-handler");
const Complaint = require("../models/complaintModel");

//@description     Register a new complaint
//@route           POST /api/complaint/
//@access          Public
const registerComplaint = asyncHandler(async (req, res) => {
    const { description, sender, pic } = req.body;

    if (!description || !sender ) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    const complaint = await Complaint.create({
      description,
      sender,
      pic,
    });

    if (complaint) {
      res.status(201).json(complaint);
    } else {
      res.status(400);
      throw new Error("Complaint not found");
    }
});

module.exports = { registerComplaint };
  