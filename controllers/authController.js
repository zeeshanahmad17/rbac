// authController.js

const jwt = require("jsonwebtoken");
const { secretKey } = require("../config"); // Assuming you have a config file with the secretKey

// Mock User (Replace this with actual user retrieval logic from database)
const mockUser = {
  id: "1",
  username: "admin",
  password: "password", // In a real scenario, passwords should be hashed
  role: "SuperAdmin",
};

const authController = {
  async register(req, res) {
    // Logic to register a user (e.g., saving user details in the database)
    // Replace this with actual registration logic
    const { username, password, role } = req.body; // Assuming 'role' is sent in the request body
    // Validate role here if needed

    // Mocking registration for Admin and Super Admin (replace with actual logic)
    if (role === "Admin" || role === "SuperAdmin") {
      res.status(200).json({ message: `${role} registered successfully` });
    } else {
      res.status(403).json({ message: "Unauthorized role for registration" });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    // Mock authentication logic (Replace with actual authentication logic)
    if (username === mockUser.username && password === mockUser.password) {
      const token = jwt.sign(
        { id: mockUser.id, username: mockUser.username, role: mockUser.role },
        secretKey
      );
      res.status(200).json({ token, message: "logged in successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  },
};

module.exports = authController;
