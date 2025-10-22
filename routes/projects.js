const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { authenticateToken } = require('../middleware/auth');

// Input validation middleware
const validateProjectData = (req, res, next) => {
  const { projectId, files } = req.body;
  
  if (!projectId || typeof projectId !== 'string') {
    return res.status(400).json({ ok: false, error: 'Valid projectId is required' });
  }
  
  if (!files || typeof files !== 'object') {
    return res.status(400).json({ ok: false, error: 'Valid files object is required' });
  }
  
  // Validate projectId format (alphanumeric and hyphens only)
  if (!/^[a-zA-Z0-9-_]+$/.test(projectId)) {
    return res.status(400).json({ ok: false, error: 'Invalid projectId format' });
  }
  
  next();
};

router.post("/save", authenticateToken, validateProjectData, async (req, res) => {
  try{
    const { projectId, title, files } = req.body;
    const existing = await Project.findOne({ projectId });
    if(existing){
      existing.files = files;
      existing.title = title || existing.title;
      existing.updatedAt = new Date();
      await existing.save();
      return res.json({ ok:true, projectId: existing.projectId });
    }
    const p = new Project({ projectId, title, files });
    await p.save();
    res.json({ ok:true, projectId: p.projectId });
  }catch(e){
    console.error('Project save error:', e);
    res.status(500).json({ ok:false, error: 'Failed to save project' });
  }
});

router.get("/load/:projectId", authenticateToken, async (req, res) => {
  try{
    const { projectId } = req.params;
    
    // Validate projectId format
    if (!/^[a-zA-Z0-9-_]+$/.test(projectId)) {
      return res.status(400).json({ ok: false, error: 'Invalid projectId format' });
    }
    
    const p = await Project.findOne({ projectId });
    if(!p) return res.status(404).json({ ok:false, error:"Project not found" });
    res.json({ ok:true, projectId: p.projectId, files: p.files, title: p.title });
  }catch(e){
    console.error('Project load error:', e);
    res.status(500).json({ ok:false, error: 'Failed to load project' });
  }
});

module.exports = router;