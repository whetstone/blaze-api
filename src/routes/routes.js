import * as usersController from '../controllers/users-controller.js';
import * as contactsController from '../controllers/contacts-controller.js';
import * as listsController from '../controllers/lists-controller.js';
import * as itemsController from '../controllers/items-controller.js';
import * as tokenController from '../controllers/token-controller.js';

export function setUpRoutes(router) {
  router.get('/users', usersController.fetchAllUsers);
  router.post('/users', usersController.createUser);
  router.get('/users/:userId', usersController.fetchUser);
  router.patch('/users/:userId', usersController.updateUser);
  router.delete('/users/:userId', usersController.deleteUser);

  router.post('/reset-token', usersController.createResetToken);
  router.put('/users/:userId/password', usersController.updatePassword);

  router.get('/lists', listsController.fetchAllLists);
  router.get('/users/:userId/lists', listsController.fetchListsForUser);
  router.post('/lists', listsController.createList);
  router.get('/lists/:listId', listsController.fetchList);
  router.patch('/lists/:listId', listsController.updateList);
  router.delete('/lists/:listId', listsController.deleteList);

  router.get('/items', itemsController.fetchAllItems);
  router.get('/lists/:listId/items', itemsController.fetchItemsForList);
  router.post('/lists/:listId/items', itemsController.createItem);
  router.get('/items/:itemId', itemsController.fetchItem);
  router.patch('/items/:itemId', itemsController.updateItem);
  router.delete('/items/:itemId', itemsController.deleteItem);

  router.get('/contacts', contactsController.fetchAllContacts);
  router.post('/contacts', contactsController.createContact);
  router.get('/contacts/:contactId', contactsController.fetchContact);
  router.patch('/contacts/:contactId', contactsController.updateContact);
  router.delete('/contacts/:contactId', contactsController.deleteContact);

  router.post('/token', tokenController.createToken);
  router.delete('/token', tokenController.deleteToken);
}
