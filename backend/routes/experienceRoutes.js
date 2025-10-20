const express = require("express");
const router = express.Router();
const {
  createExperience,
  getApprovedExperiences,
  getPendingExperiences,
  approveExperience,
  deleteExperience,
  getExperienceById,
  incrementViews,
} = require("../controllers/experienceController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Student Routes
router.post("/", protect, createExperience); // submit new experience
router.get("/", getApprovedExperiences); // view all approved
router.get("/:id", getExperienceById); // view single experience
router.put("/:id/view", incrementViews); // count views

// Admin Routes
router.get("/admin/pending", protect, adminOnly, getPendingExperiences);
router.put("/admin/approve/:id", protect, adminOnly, approveExperience);
router.delete("/admin/delete/:id", protect, adminOnly, deleteExperience);

// ===== Get posts of logged-in student =====
router.get("/me", protect, async (req, res) => {
  try {
    const studentPosts = await Experience.find({ student: req.user.id }).populate("student", "name email");
    res.json(studentPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
