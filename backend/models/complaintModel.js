const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    description: { type: "String", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pic: { type: "String"},
  },
  { timestaps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
