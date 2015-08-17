import { STRING, INTEGER, DATE, } from 'sequelize';
import db from '../config/db.js';
import users from './users.js';

const lists = db.define('lists', {
  listId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerUserId: {
    type: INTEGER,
  },
  name: {
    type: STRING,
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

lists.belongsTo(users, { foreignKey: 'ownerUserId' });

export default lists;
