import Sequelize from 'sequelize';
import db from '../config/db.js';

const Users = db.define('users', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id',
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_timestamp',
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_timestamp',
  },
}, {
  freezeTableName: true,
});

export default Users;
