// superAdminController.js

const Admin = require("../models/Admin.js");

const superAdminController = {
  async createAdmin(req, res) {
    try {
      const { username, password, role } = req.body;
      const admin = new Admin({ username, password, role });
      await admin.save();
      res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllAdmins(req, res) {
    try {
      const admins = await Admin.find();
      res.status(200).json({ admins });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const { username, password, role } = req.body;
      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { username, password, role },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Admin updated successfully", admin: updatedAdmin });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteAdmin(req, res) {
    try {
      const { id } = req.params;
      await Admin.findByIdAndDelete(id);
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = superAdminController;
