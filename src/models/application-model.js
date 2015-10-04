import { STRING, INTEGER, DATE, JSONB } from 'sequelize';
import Event from './event-model.js';
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
});

Application.hasMany(Event, { as: 'Events', foreignKey: 'applicationId' });

export default Event;