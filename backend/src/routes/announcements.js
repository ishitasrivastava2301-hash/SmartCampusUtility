import express from 'express';
import Announcement from '../models/Announcement.js';
import { requireAuth } from '../middleware/auth.js';
import { permit } from '../middleware/roles.js';

const router = express.Router();

router.post('/', requireAuth, permit('admin'), async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: 'Title and body are required' });
  }

  const announcement = await Announcement.create({
    title,
    body,
    creatorId: req.user.id,
  });
  res.status(201).json(announcement);
});

router.get('/', requireAuth, async (req, res) => {
  const announcements = await Announcement.findAll({ order: [['createdAt', 'DESC']] });
  res.json(announcements);
});

export default router;
