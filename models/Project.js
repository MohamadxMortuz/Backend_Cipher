const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  projectId: { type: String, unique: true },
  title: String,
  files: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Project", ProjectSchema);