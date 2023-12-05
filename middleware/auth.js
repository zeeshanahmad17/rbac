// auth.js

const jwt = require("jsonwebtoken");
const { secretKey } = require("../config.js"); // Replace this with your actual secret key

// Define roles
const Roles = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  HR: "HR",
  USER: "User",
};

// Middleware to authorize user based on roles
const authorizeUser = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Token not provided." });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Access denied. Invalid token." });
      }

      const userRole = decoded.role;
      if (!allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      // Set user role in request for further processing if needed
      req.userRole = userRole;
      next();
    });
  };
};

module.exports = {
  authorizeUser,
  Roles,
};
