import { INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import db from '../config/db.js';

const users = db.define('users', {
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
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
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

export default users;
