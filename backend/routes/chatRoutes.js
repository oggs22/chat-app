const express = require("express");
const {
  accessChat,
  fetchChats,
  deleteChat
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/remove").post(protect, deleteChat);

module.exports = router;
