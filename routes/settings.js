import express from 'express';
import Settings from '../models/Settings.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/settings/company - Public route for footer/contact
router.get('/company', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create defaults if not found
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/settings/company - Admin only update
router.put('/company', protect, adminOnly, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    settings.companyName = req.body.companyName || settings.companyName;
    settings.address = req.body.address || settings.address;
    settings.phone = req.body.phone || settings.phone;
    settings.email = req.body.email || settings.email;
    settings.workingHours = req.body.workingHours || settings.workingHours;
    
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
