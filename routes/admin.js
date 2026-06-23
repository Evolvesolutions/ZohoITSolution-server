import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import InternApplication from '../models/InternApplication.js';
import ContactMessage from '../models/ContactMessage.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin/stats - Admin only
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: 'user' });
    const internCount = await InternApplication.countDocuments();
    const courseCount = await Course.countDocuments();
    
    // Also get counts by status for interns
    const pendingInterns = await InternApplication.countDocuments({ status: 'Pending' });
    const acceptedInterns = await InternApplication.countDocuments({ status: 'Accepted' });

    // Message counts
    const messageCount = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ status: 'Unread' });

    res.json({
      users: userCount,
      interns: internCount,
      courses: courseCount,
      pendingInterns,
      acceptedInterns,
      messages: messageCount,
      unreadMessages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
