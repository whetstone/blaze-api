import express from 'express';
import logger from 'morgan';
import errorhandler from 'errorhandler';
import cors from 'cors';
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import * as usersController from './controllers/users-controller.js';
import * as contactsController from './controllers/contacts-controller.js';
import * as listsController from './controllers/lists-controller.js';
import * as listPermissionsController from './controllers/list-permissions-controller.js';
import * as itemsController from './controllers/items-controller.js';

const app = express();
const router = express.Router();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: true, // TODO: Configure allowed origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(errorhandler());

// API Routes
app.use(router);
router.get('/users', usersController.fetchAllUsers);
router.post('/users', usersController.createUser);
router.get('/users/:userId', usersController.fetchUser);
router.patch('/users/:userId', usersController.updateUser);
router.delete('/users/:userId', usersController.deleteUser);

router.get('/lists', listsController.fetchAllLists);
router.get('/users/:userId/lists', listsController.fetchListsForUser);
router.post('/users/:userId/lists', listsController.createList);
router.get('/lists/:listId', listsController.fetchList);
router.patch('/lists/:listId', listsController.updateList);
router.delete('/lists/:listId', listsController.deleteList);

// Unauthorized Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token');
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`GiftRej listening at ${host}:${port}`);
});

export default app;
