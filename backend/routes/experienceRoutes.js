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

module.exports = router;
