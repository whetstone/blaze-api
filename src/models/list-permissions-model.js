import { INTEGER, DATE, } from 'sequelize';
import db from '../config/db.js';
import List from './list-model.js';
import Contact from './contact-model.js';

const ListPermissions = db.define('list_permissions', {
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

ListPermissions.belongsTo(List, { foreignKey: 'listId' });
ListPermissions.belongsTo(Contact, { foreignKey: 'contactId' });

export default ListPermissions;
