import { INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import db from '../config/db.js';

export default db.define('users', {
  userId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id',
  },
  firstName: {
    type: STRING,
    field: 'first_name',
  },
  lastName: {
    type: STRING,
    field: 'last_name',
  },
  userName: {
    type: STRING,
    field: 'user_name',
  },
  email: {
    type: STRING,
    field: 'email',
  },
  password: {
    type: STRING,
    field: 'password',
  },
  resetPasswordToken: {
    type: STRING,
    field: 'reset_password_token',
  },
  resetPasswordTimestamp: {
    type: DATE,
    field: 'reset_password_timestamp',
  },
  logInCount: {
    type: INTEGER,
    field: 'log_in_count',
  },
  lastLoginAt: {
    type: DATE,
    field: 'last_login_at',
  },
  allowNotifications: {
    type: BOOLEAN,
    field: 'allow_notifications',
  },
  createdAt: {
    type: DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DATE,
    field: 'updated_at',
  },
}, {
  freezeTableName: true,
});
