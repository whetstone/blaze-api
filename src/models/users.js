import { INTEGER, STRING, DATE } from 'sequelize';
import db from '../config/db.js';

const Users = db.define('users', {
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
  createdAt: {
    type: DATE,
    field: 'created_timestamp',
  },
  updatedAt: {
    type: DATE,
    field: 'updated_timestamp',
  },
}, {
  freezeTableName: true,
});

export default Users;
