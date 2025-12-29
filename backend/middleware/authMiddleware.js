const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Token invalid");
  }
};

const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor") {
    res.status(403);
    throw new Error("Instructor access only");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Admin access only");
  }
  next();
};

module.exports = { protect, isInstructor, isAdmin };
