import { INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import db from '../config/db.js';

const User = db.define('users', {
  userId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: STRING,
  },
  resetPasswordTimestamp: {
    type: DATE,
  },
  logInCount: {
    type: INTEGER,
  },
  lastLoginAt: {
    type: DATE,
  },
  allowNotifications: {
    type: BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
}, {
  freezeTableName: true,
});

export default User;
