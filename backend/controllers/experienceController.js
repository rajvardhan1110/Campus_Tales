const Experience = require("../models/Experience");

// @desc Create new experience
// @route POST /api/experience
// @access Private (Student)
exports.createExperience = async (req, res) => {
  try {
    const { companyName, type, experienceText } = req.body;

    if (!companyName || !type || !experienceText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const experience = await Experience.create({
      student: req.user.id,
      companyName,
      type,
      experienceText,
      status: "pending",
    });

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all approved experiences
// @route GET /api/experience
// @access Public
exports.getApprovedExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ status: "approved" })
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get single experience by ID
// @route GET /api/experience/:id
exports.getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).populate("student", "name email");
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Increment views
// @route PUT /api/experience/:id/view
exports.incrementViews = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    exp.views += 1;
    await exp.save();
    res.json({ views: exp.views });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all pending experiences (Admin)
// @route GET /api/experience/admin/pending
// @access Admin
exports.getPendingExperiences = async (req, res) => {
  try {
    const pending = await Experience.find({ status: "pending" }).populate("student", "name email");
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Approve experience (Admin)
// @route PUT /api/experience/admin/approve/:id
// @access Admin
exports.approveExperience = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    exp.status = "approved";
    await exp.save();
    res.json({ message: "Experience approved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete experience (Admin)
// @route DELETE /api/experience/admin/delete/:id
// @access Admin
exports.deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    await exp.deleteOne();
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
