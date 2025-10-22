const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

const Experience = require("../models/Experience");
const User = require("../models/User");

// ===== Get all experiences (Admin) =====
router.get("/experience/all", protect, adminOnly, async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate("student", "name email year") // populate year
      .sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Approve experience =====
router.put("/experience/approve/:id", protect, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    experience.status = "approved";
    await experience.save();

    res.json({ message: "Experience approved", experience });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Reject experience =====
router.put("/experience/reject/:id", protect, adminOnly, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    experience.status = "rejected";
    await experience.save();

    res.json({ message: "Experience rejected", experience });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== Analytics =====
router.get("/analytics", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalExperiences = await Experience.countDocuments();
    const totalApproved = await Experience.countDocuments({ status: "approved" });
    const totalPending = await Experience.countDocuments({ status: "pending" });
    const totalRejected = await Experience.countDocuments({ status: "rejected" });

    res.json({
      totalUsers,
      totalExperiences,
      totalApproved,
      totalPending,
      totalRejected,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
