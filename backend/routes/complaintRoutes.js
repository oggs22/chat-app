const express = require("express");
const { registerComplaint } = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, registerComplaint);

module.exports = router;
