const Course = require("../models/Course");

// Instructor creates course
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// Get all courses (students)
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// Student enroll
exports.enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

    if (course.students.includes(req.user.id)) {
      res.status(400);
      throw new Error("Already enrolled");
    }

    course.students.push(req.user.id);
    await course.save();

    res.json({ message: "Enrolled successfully" });
  } catch (error) {
    next(error);
  }
};
