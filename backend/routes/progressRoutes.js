const express = require("express");
const router = express.Router();
const {
  markCompleted,
  getProgress,
} = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

router.post("/:courseId/complete", protect, markCompleted);
router.get("/", protect, getProgress);

module.exports = router;
