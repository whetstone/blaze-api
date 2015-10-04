import { STRING, INTEGER, DATE, JSONB } from 'sequelize';
import db from '../config/db.js';

const Application = db.define('applications', {
  applicationId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DATE,
  },
  updatedAt: {
    type: DATE,
  },
  version: {
    type: STRING,
  },
  name: {
    type: STRING,
  },
}, {
  freezeTableName: true,
});

export default Application;