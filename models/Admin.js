// models/Admin.js

const mongoose = require("mongoose");

// Define the schema for Admin
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "HR", "User"], // Adjust roles as per your requirements
      required: true,
    },
    // Add other fields as needed
  },
  { timestamps: true }
);

// Create Admin model from the schema
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
