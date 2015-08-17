import { INTEGER, DATE, } from 'sequelize';
import db from '../config/db.js';
import users from './users.js';

const contacts = db.define('contacts', {
  contactId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contactUserId: {
    type: INTEGER,
  },
  userId: {
    type: INTEGER,
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

contacts.belongsTo(users, { foreignKey: 'contactUserId' });
contacts.belongsTo(users, { foreignKey: 'userId' });

export default contacts;
