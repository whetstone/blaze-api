import { STRING, INTEGER, DATE, JSONB } from 'sequelize';
import Application from './application-model.js';
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
}, {
  freezeTableName: true,
});

Event.belongsTo(Application, { foreignKey: 'applicationId', onDelete: 'CASCADE' });

export default Event;