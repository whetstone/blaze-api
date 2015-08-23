// This utility exports a function that synchronizes each model with the database in the correct order.
// This utility should only be used when there are changes to one or more models.

import Contact from '../models/contact-model.js';
import Item from '../models/item-model.js';
import List from '../models/list-model.js';
import User from '../models/user-model.js';

export function syncDb() {
  User.sync({force: true})
    .then(() => {
      Contact.sync({force: true})
        .catch(error => {
          console.error(error);
        });

      List.sync({force: true})
        .then(() => {
          Item.sync({force: true});
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}
