import { INTEGER, DATE, } from 'sequelize';
import db from '../config/db.js';
import lists from './lists.js';
import contacts from './contacts.js';

const listPermissions = db.define('list_permissions', {
  listId: {
    type: INTEGER,
    primaryKey: true,
  },
  contactId: {
    type: INTEGER,
    primaryKey: true,
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

listPermissions.belongsTo(lists);
listPermissions.belongsTo(contacts);

export default listPermissions;
