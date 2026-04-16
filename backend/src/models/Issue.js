import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Issue = sequelize.define('Issue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED'),
    defaultValue: 'OPEN',
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Issue.belongsTo(User, { as: 'reporter', foreignKey: 'reporterId' });
User.hasMany(Issue, { foreignKey: 'reporterId' });

export default Issue;
