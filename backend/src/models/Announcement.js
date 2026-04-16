import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Announcement.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
User.hasMany(Announcement, { foreignKey: 'creatorId' });

export default Announcement;
