import express from 'express';
import Issue from '../models/Issue.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { permit } from '../middleware/roles.js';

const router = express.Router();

router.post('/', requireAuth, permit('student'), async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const issue = await Issue.create({
    title,
    description,
    category,
    reporterId: req.user.id,
  });

  res.status(201).json(issue);
});

router.get('/', requireAuth, async (req, res) => {
  const where = req.user.role === 'admin' ? {} : { reporterId: req.user.id };
  const issues = await Issue.findAll({
    where,
    include: [{ model: User, as: 'reporter', attributes: ['id', 'name', 'email'] }],
    order: [['createdAt', 'DESC']],
  });
  res.json(issues);
});

router.patch('/:id', requireAuth, permit('admin'), async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;
  const issue = await Issue.findByPk(id);

  if (!issue) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  if (status) issue.status = status;
  if (assignedTo !== undefined) issue.assignedTo = assignedTo;
  await issue.save();

  res.json(issue);
});

export default router;
