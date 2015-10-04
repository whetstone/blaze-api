// This utility exports a function that synchronizes each model with the database in the correct order.
// This utility should only be used when there are changes to one or more models.

import Event from '../models/event-model.js';
import Application from '../models/application-model.js';

export function syncDb() {
  Application.sync({force: true})
    .then(() => {
      Event.sync({force: true})
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}
