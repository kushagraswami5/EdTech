const User = require("../models/User");

// Mark course completed
exports.markCompleted = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const existing = user.progress.find(
      (p) => p.course.toString() === req.params.courseId
    );

    if (existing) {
      existing.completed = true;
    } else {
      user.progress.push({
        course: req.params.courseId,
        completed: true,
      });
    }

    await user.save();
    res.json({ message: "Course marked as completed" });
  } catch (error) {
    next(error);
  }
};

// Get progress
exports.getProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "progress.course",
      "title"
    );

    res.json(user.progress);
  } catch (error) {
    next(error);
  }
};
