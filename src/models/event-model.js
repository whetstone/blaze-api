import { INTEGER, DATE, JSONB } from 'sequelize';
import db from '../config/db.js';

const Event = db.define('events', {
  eventId: {
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
  event: {
    type: JSONB,
  },
});

export default Event;