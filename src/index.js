import express from 'express';
import logger from 'morgan';
import errorhandler from 'errorhandler';
import cors from 'cors';
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import Users from './models/user';

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
router.get('/users', function (req, res, next) {
  Users.sync().then(function () {
    return Users.findAll().then(function (users) {
      res.status(200).send(users);
    });
  });
});

router.post('/users', function (req, res, next) {
  Users.sync().then(function () {
    return Users.create({
      firstName: 'Greg',
      lastName: 'Fiorentino',
    }).then(function (user) {
      res.status(201).send(user);
    });
  });
});

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
