import { INTEGER, STRING, DATE, BOOLEAN, TEXT, DECIMAL } from 'sequelize';
import db from '../config/db.js';
import lists from './lists.js';
import users from './users.js';

const Item = db.define('items', {
  itemId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  listId: {
    type: INTEGER,
  },
  createdByUserId: {
    type: INTEGER,
  },
  claimedByUserId: {
    type: INTEGER,
  },
  name: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
  url: {
    type: STRING,
  },
  price: {
    type: DECIMAL(10, 2),
  },
  claimed: {
    type: BOOLEAN,
  },
  secret: {
    type: BOOLEAN,
  },
  priority: {
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

Item.belongsTo(lists);
Item.belongsTo(users, { foreignKey: 'createdByUserId' });
Item.belongsTo(users, { foreignKey: 'claimedByUserId' });

export default Item;
