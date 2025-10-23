const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

// Protect all routes
router.use(protect, adminOnly);

router.get("/experience/all", adminController.getAllExperiences);
router.put("/experience/approve/:id", adminController.approveExperience);
router.put("/experience/reject/:id", adminController.rejectExperience);
router.get("/analytics", adminController.getAnalytics);
router.get("/experience/:id", adminController.getExperienceById);

module.exports = router;
