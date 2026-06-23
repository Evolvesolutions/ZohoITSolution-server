import express from 'express';
import InternApplication from '../models/InternApplication.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin only: Get all applications (optionally filtered by type)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const apps = await InternApplication.find(filter).sort({ submittedAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User only: Get my applications
router.get('/my-applications', protect, async (req, res) => {
  try {
    const apps = await InternApplication.find({ email: req.user.email }).sort({ submittedAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public: Submit an application
router.post('/', async (req, res) => {
  const app = new InternApplication(req.body);
  try {
    const savedApp = await app.save();
    res.status(201).json(savedApp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin only: Update application status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const updatedApp = await InternApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedApp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin only: Delete application
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deletedApp = await InternApplication.findByIdAndDelete(req.params.id);
    if (deletedApp) {
      res.json({ message: 'Application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
