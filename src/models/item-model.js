import { INTEGER, STRING, DATE, BOOLEAN, TEXT, DECIMAL } from 'sequelize';
import db from '../config/db.js';
import List from './list-model.js';
import User from './user-model.js';

const Item = db.define('items', {
  itemId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  listId: {
    type: INTEGER,
    allowNull: false,
  },
  createdByUserId: {
    type: INTEGER,
    allowNull: false,
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
    defaultValue: false,
  },
  secret: {
    type: BOOLEAN,
    defaultValue: false,
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

Item.belongsTo(List, { foreignKey: 'listId' });
Item.belongsTo(User, { foreignKey: 'createdByUserId' });
Item.belongsTo(User, { foreignKey: 'claimedByUserId' });

export default Item;
