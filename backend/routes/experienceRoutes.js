const express = require("express");
const router = express.Router();
const {
  createExperience,
  getApprovedExperiences,
  getPendingExperiences,
  approveExperience,
  rejectExperience,
  getExperienceById,
  incrementViews,
  getMyExperiences,
  getMyPosts
  
} = require("../controllers/experienceController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


//experience routes 
router.get("/me", protect, getMyPosts);
router.get("/:id", protect, getExperienceById);

// Student Routes
router.post("/", protect, createExperience); // submit new experience
router.get("/", getApprovedExperiences); // view all approved
router.get("/:id", getExperienceById); // view single experience
router.put("/:id/view", incrementViews); // count views

// Admin Routes
router.get("/admin/pending", protect, adminOnly, getPendingExperiences);
router.put("/admin/approve/:id", protect, adminOnly, approveExperience);
router.put("/admin/reject/:id", protect, adminOnly, rejectExperience);


module.exports = router;
