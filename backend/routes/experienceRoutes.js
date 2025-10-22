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
  getMyExperiences
  
} = require("../controllers/experienceController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Student Routes
router.get("/me", protect, async (req, res) => {
  try {
    const userId = req.user.id; // coming from protect middleware
    const experiences = await Experience.find({ student: userId }).populate(
      "student",
      "name email year"
    );
    res.json(experiences); // make sure this is an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


router.post("/", protect, createExperience); // submit new experience
router.get("/", getApprovedExperiences); // view all approved
router.get("/:id", getExperienceById); // view single experience
router.put("/:id/view", incrementViews); // count views

// Admin Routes
router.get("/admin/pending", protect, adminOnly, getPendingExperiences);
router.put("/admin/approve/:id", protect, adminOnly, approveExperience);
router.put("/admin/reject/:id", protect, adminOnly, rejectExperience);


module.exports = router;
