import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import issueRoutes from './routes/issues.js';
import announcementRoutes from './routes/announcements.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/announcements', announcementRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

export default app;
