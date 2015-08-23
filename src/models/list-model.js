import { STRING, INTEGER, DATE, } from 'sequelize';
import db from '../config/db.js';
import User from './user-model.js';

const List = db.define('lists', {
  listId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerUserId: {
    type: INTEGER,
    allowNull: false,
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

List.belongsTo(User, { foreignKey: 'ownerUserId' });

export default List;
