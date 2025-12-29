const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  enrollCourse,
} = require("../controllers/courseController");
const {
  protect,
  isInstructor,
} = require("../middleware/authMiddleware");

// Instructor creates course
router.post("/", protect, isInstructor, createCourse);

// Get all courses (students)
router.get("/", protect, getCourses);

// Student enrolls in course
router.post("/:id/enroll", protect, enrollCourse);

module.exports = router;
