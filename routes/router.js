const express = require("express");
const router = express.Router();

// Middleware for role-based access control
const { authorizeUser, Roles } = require("../middleware/auth"); // Assuming you have a middleware for authorization

// Controller methods for different user roles
const authController = require("../controllers/authController");
const superAdminController = require("../controllers/superAdminController");
const adminController = require("../controllers/adminController");

// Authentication routes (register and login)
router.post("/register", authController.register);
router.post("/login", authController.login);

// Routes accessible only by Super Admin
router.post(
  "/super-admin/create-admin",
  authorizeUser([Roles.SUPER_ADMIN]),
  superAdminController.createAdmin
);
router.get(
  "/super-admin/admins",
  authorizeUser([Roles.SUPER_ADMIN]),
  superAdminController.getAllAdmins
);
router.delete(
  "/super-admin/delete-admin/:id",
  authorizeUser([Roles.SUPER_ADMIN]),
  superAdminController.deleteAdmin
);

// Routes accessible by Admin and Super Admin
router.put(
  "/super-admin/update-admin/:id",
  authorizeUser([Roles.SUPER_ADMIN]),
  superAdminController.updateAdmin
);
// router.post(
//   "/admin/add-user",
//   authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]),
//   adminController.addUser
// );
// router.put(
//   "/admin/update-user/:id",
//   authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]),
//   adminController.updateUser
// );
// router.delete(
//   "/admin/delete-user/:id",
//   authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]),
//   adminController.deleteUser
// );
// router.get(
//   "/admin/view-user/:id",
//   authorizeUser([Roles.ADMIN, Roles.SUPER_ADMIN]),
//   adminController.viewUser
// );

module.exports = router;
