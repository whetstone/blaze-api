import { INTEGER, DATE, BOOLEAN } from 'sequelize';
import db from '../config/db.js';
import User from './user-model.js';

const Contact = db.define('contacts', {
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
  active: {
    type: BOOLEAN,
    defaultValue: false,
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

Contact.belongsTo(User, { foreignKey: 'contactUserId' });
Contact.belongsTo(User, { foreignKey: 'userId' });

export default Contact;
