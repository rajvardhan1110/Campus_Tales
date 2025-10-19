const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

const Experience = require("../models/Experience");
const User = require("../models/User");

// ===== Get all pending experiences =====
router.get("/experience/pending", protect, adminOnly, async (req, res) => {
  try {
    const pending = await Experience.find({ status: "pending" }).populate(
      "student",
      "name email"
    );
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Approve experience =====
router.put("/experience/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    experience.status = "approved";
    await experience.save();

    res.json({ message: "Experience approved", experience });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Reject/Delete experience =====
router.delete("/experience/delete/:id", protect, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    await experience.remove();
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Analytics (Optional) =====
router.get("/analytics", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalExperiences = await Experience.countDocuments();
    const totalApproved = await Experience.countDocuments({ status: "approved" });
    const totalPending = await Experience.countDocuments({ status: "pending" });

    res.json({
      totalUsers,
      totalExperiences,
      totalApproved,
      totalPending,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
