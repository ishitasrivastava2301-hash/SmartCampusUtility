import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Issue from '../models/Issue.js';
import Announcement from '../models/Announcement.js';

const seed = async () => {
  const adminUsers = [
    { name: 'Campus Admin', email: 'admin@campus.edu', password: 'Admin123!', role: 'admin' },
    { name: 'Support Lead', email: 'support@campus.edu', password: 'Support123!', role: 'admin' },
  ];

  const studentUsers = [
    { name: 'Campus Student', email: 'student@campus.edu', password: 'Student123!', role: 'student' },
    { name: 'Aarti Sharma', email: 'aarti@campus.edu', password: 'Aarti123!', role: 'student' },
    { name: 'Rahul Singh', email: 'rahul@campus.edu', password: 'Rahul123!', role: 'student' },
  ];

  for (const userData of [...adminUsers, ...studentUsers]) {
    const exists = await User.count({ where: { email: userData.email } });
    if (!exists) {
      await User.create({
        name: userData.name,
        email: userData.email,
        passwordHash: bcrypt.hashSync(userData.password, 10),
        role: userData.role,
      });
    }
  }

  const admin = await User.findOne({ where: { email: 'admin@campus.edu' } });
  const student = await User.findOne({ where: { email: 'student@campus.edu' } });
  const aarti = await User.findOne({ where: { email: 'aarti@campus.edu' } });
  const rahul = await User.findOne({ where: { email: 'rahul@campus.edu' } });

  const announcements = [
    { title: 'Welcome to Smart Campus', body: 'Students and admins can now manage issues and announcements from a single platform.' },
    { title: 'Campus Wi-Fi Upgrade', body: 'The Wi-Fi network will receive a performance upgrade this weekend.' },
    { title: 'Safety Reminder', body: 'Remember to carry your ID card and report any safety hazards immediately.' },
  ];

  for (const announcementData of announcements) {
    const exists = await Announcement.count({ where: { title: announcementData.title } });
    if (!exists) {
      await Announcement.create({
        ...announcementData,
        creatorId: admin ? admin.id : null,
      });
    }
  }

  const issues = [
    {
      title: 'Projector not working in Room 101',
      description: 'The classroom projector is not turning on during lectures.',
      category: 'Classroom',
      reporter: student,
    },
    {
      title: 'Wi-Fi drops in Library',
      description: 'Library Wi-Fi disconnects frequently while studying.',
      category: 'Facility',
      reporter: aarti,
    },
    {
      title: 'AC not cooling in Dorm 7',
      description: 'The air conditioning unit is weak and the room stays warm.',
      category: 'Housing',
      reporter: rahul,
    },
  ];

  for (const issueData of issues) {
    const exists = await Issue.count({ where: { title: issueData.title } });
    if (!exists && issueData.reporter) {
      await Issue.create({
        title: issueData.title,
        description: issueData.description,
        category: issueData.category,
        reporterId: issueData.reporter.id,
      });
    }
  }
};

export default seed;
